import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, extname, resolve, sep } from 'node:path';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { loadEnv } from 'vite';
import { projectsData } from './src/data/projectsData.js';

const production = process.argv.includes('--production');
const env = { ...loadEnv(production ? 'production' : 'development', process.cwd(), ''), ...process.env };
const port = Number(env.PORT || (production ? 4173 : 3001));
const adminUsername = env.ADMIN_USERNAME || '';
const adminPassword = env.ADMIN_PASSWORD || '';
const projectFile = resolve('data/projects.json');
const projectImagesDirectory = resolve('data/project-images');
const distDirectory = resolve('dist');
const sessionLifetime = 8 * 60 * 60 * 1000;
const sessions = new Map();
const loginAttempts = new Map();

function readProjects() {
  if (!existsSync(projectFile)) return projectsData;
  try {
    const data = JSON.parse(readFileSync(projectFile, 'utf8'));
    return Array.isArray(data) ? data : projectsData;
  } catch {
    return projectsData;
  }
}

let projects = readProjects();

function sendJson(response, status, value, headers = {}) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  response.end(JSON.stringify(value));
}

function secureEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function getSessionId(request) {
  const cookie = request.headers.cookie || '';
  const match = cookie.match(/(?:^|;\s*)tensora_admin=([a-f0-9]+)/);
  return match?.[1] || '';
}

function hasSession(request) {
  const sessionId = getSessionId(request);
  const expiresAt = sessions.get(sessionId);
  if (!expiresAt) return false;
  if (expiresAt < Date.now()) {
    sessions.delete(sessionId);
    return false;
  }
  return true;
}

function readJson(request, maxBytes = 1_000_000) {
  return new Promise((resolveBody, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > maxBytes) {
        reject(new Error('Request body is too large.'));
        request.destroy();
      }
    });
    request.on('end', () => {
      try {
        resolveBody(JSON.parse(body));
      } catch {
        reject(new Error('Request body must be valid JSON.'));
      }
    });
    request.on('error', reject);
  });
}

function validateProjects(value) {
  if (!Array.isArray(value) || value.length > 100) return null;
  const ids = new Set();
  const normalized = [];

  for (const project of value) {
    if (!project || typeof project !== 'object') return null;
    const fields = ['id', 'title', 'category', 'client', 'year', 'description', 'typeBadge'];
    if (fields.some((field) => typeof project[field] !== 'string' || !project[field].trim())) return null;
    if (!/^[\w-]{1,80}$/.test(project.id) || ids.has(project.id)) return null;
    if (project.title.length > 160 || project.category.length > 80 || project.client.length > 120 ||
        project.year.length > 12 || project.description.length > 3000 || project.typeBadge.length > 100) return null;
    const imageUrl = project.imageUrl || '';
    if (typeof imageUrl !== 'string' || (imageUrl && !/^\/api\/project-images\/[a-f0-9]{32}\.(png|jpg|webp|gif)$/.test(imageUrl))) return null;
    if (!Array.isArray(project.tags) || project.tags.length > 20 ||
        project.tags.some((tag) => typeof tag !== 'string' || tag.length > 50)) return null;
    if (!project.imageTheme || !/^(linear|radial)-gradient\([#a-zA-Z0-9.,%\s()-]+\)$/.test(project.imageTheme)) return null;
    if (!/^#[0-9a-f]{6}$/i.test(project.accent || '')) return null;
    if (typeof project.featured !== 'boolean') return null;
    if (!project.stats || typeof project.stats !== 'object' || Array.isArray(project.stats)) return null;
    if (Object.keys(project.stats).length > 12 || Object.values(project.stats).some((stat) =>
      !['string', 'number'].includes(typeof stat) || String(stat).length > 80
    )) return null;

    ids.add(project.id);
    normalized.push({
      id: project.id,
      title: project.title.trim(),
      category: project.category.trim(),
      client: project.client.trim(),
      year: project.year.trim(),
      description: project.description.trim(),
      tags: project.tags.map((tag) => tag.trim()),
      stats: project.stats,
      imageUrl,
      imageTheme: project.imageTheme,
      featured: project.featured,
      accent: project.accent,
      typeBadge: project.typeBadge.trim()
    });
  }

  return normalized;
}

function removeUnusedProjectImages(projectList) {
  if (!existsSync(projectImagesDirectory)) return;
  const usedImages = new Set(projectList.map((project) => project.imageUrl.split('/').pop()).filter(Boolean));
  for (const filename of readdirSync(projectImagesDirectory)) {
    if (/^[a-f0-9]{32}\.(png|jpg|webp|gif)$/.test(filename) && !usedImages.has(filename)) {
      unlinkSync(resolve(projectImagesDirectory, filename));
    }
  }
}

async function handleApi(request, response, url) {
  const imageMatch = url.pathname.match(/^\/api\/project-images\/([a-f0-9]{32}\.(?:png|jpg|webp|gif))$/);
  if (request.method === 'GET' && imageMatch) {
    const imagePath = resolve(projectImagesDirectory, imageMatch[1]);
    if (!existsSync(imagePath)) {
      sendJson(response, 404, { error: 'Image not found.' });
      return;
    }
    const extension = extname(imagePath);
    const imageTypes = { '.gif': 'image/gif', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
    response.writeHead(200, {
      'Content-Type': imageTypes[extension],
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(readFileSync(imagePath));
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/projects') {
    sendJson(response, 200, projects);
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/admin/login') {
    if (!adminUsername || !adminPassword) {
      sendJson(response, 503, { error: 'Admin credentials are not configured on the server.' });
      return;
    }

    const clientIp = request.socket.remoteAddress || 'unknown';
    const attempt = loginAttempts.get(clientIp) || { count: 0, startedAt: Date.now() };
    if (Date.now() - attempt.startedAt > 15 * 60 * 1000) {
      attempt.count = 0;
      attempt.startedAt = Date.now();
    }
    if (attempt.count >= 5) {
      loginAttempts.set(clientIp, attempt);
      sendJson(response, 429, { error: 'Too many login attempts. Try again in 15 minutes.' });
      return;
    }

    let credentials;
    try {
      credentials = await readJson(request);
    } catch (error) {
      sendJson(response, 400, { error: error.message });
      return;
    }

    if (!secureEqual(String(credentials.username || ''), adminUsername) ||
        !secureEqual(String(credentials.password || ''), adminPassword)) {
      attempt.count += 1;
      loginAttempts.set(clientIp, attempt);
      sendJson(response, 401, { error: 'Incorrect username or password.' });
      return;
    }

    loginAttempts.delete(clientIp);
    const sessionId = randomBytes(32).toString('hex');
    sessions.set(sessionId, Date.now() + sessionLifetime);
    sendJson(response, 200, { authenticated: true }, {
      'Set-Cookie': `tensora_admin=${sessionId}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${sessionLifetime / 1000}${production ? '; Secure' : ''}`
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/admin/session') {
    sendJson(response, hasSession(request) ? 200 : 401, { authenticated: hasSession(request) });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/admin/project-image') {
    if (!hasSession(request)) {
      sendJson(response, 401, { error: 'Please sign in again.' });
      return;
    }

    let payload;
    try {
      payload = await readJson(request, 7 * 1024 * 1024 + 1024);
    } catch (error) {
      sendJson(response, 400, { error: error.message });
      return;
    }

    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      sendJson(response, 400, { error: 'Image upload data is invalid.' });
      return;
    }

    const imageTypes = {
      'image/gif': { extension: 'gif', signature: (buffer) => buffer.toString('ascii', 0, 3) === 'GIF' },
      'image/jpeg': { extension: 'jpg', signature: (buffer) => buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff },
      'image/png': { extension: 'png', signature: (buffer) => buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) },
      'image/webp': { extension: 'webp', signature: (buffer) => buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP' }
    };
    const imageType = imageTypes[payload.mimeType];
    const dataUrlPrefix = `data:${payload.mimeType};base64,`;
    if (!imageType || typeof payload.dataUrl !== 'string' || !payload.dataUrl.startsWith(dataUrlPrefix)) {
      sendJson(response, 400, { error: 'Upload a PNG, JPEG, WebP, or GIF image.' });
      return;
    }

    const imageBuffer = Buffer.from(payload.dataUrl.slice(dataUrlPrefix.length), 'base64');
    if (!imageBuffer.length || imageBuffer.length > 5 * 1024 * 1024 || !imageType.signature(imageBuffer)) {
      sendJson(response, 400, { error: 'The image is invalid or larger than 5 MB.' });
      return;
    }

    const filename = `${randomBytes(16).toString('hex')}.${imageType.extension}`;
    mkdirSync(projectImagesDirectory, { recursive: true });
    writeFileSync(resolve(projectImagesDirectory, filename), imageBuffer, { flag: 'wx' });
    sendJson(response, 201, { imageUrl: `/api/project-images/${filename}` });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/admin/logout') {
    sessions.delete(getSessionId(request));
    sendJson(response, 200, { authenticated: false }, {
      'Set-Cookie': 'tensora_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'
    });
    return;
  }

  if (request.method === 'PUT' && url.pathname === '/api/admin/projects') {
    if (!hasSession(request)) {
      sendJson(response, 401, { error: 'Please sign in again.' });
      return;
    }

    let payload;
    try {
      payload = await readJson(request);
    } catch (error) {
      sendJson(response, 400, { error: error.message });
      return;
    }

    const nextProjects = validateProjects(payload.projects);
    if (!nextProjects) {
      sendJson(response, 400, { error: 'Project data is invalid or exceeds the allowed limits.' });
      return;
    }

    const temporaryFile = `${projectFile}.tmp`;
    mkdirSync(dirname(projectFile), { recursive: true });
    writeFileSync(temporaryFile, JSON.stringify(nextProjects, null, 2));
    renameSync(temporaryFile, projectFile);
    projects = nextProjects;
    removeUnusedProjectImages(projects);
    sendJson(response, 200, { success: true, count: projects.length });
    return;
  }

  sendJson(response, 404, { error: 'Not found.' });
}

function serveStatic(request, response, pathname) {
  const requestedPath = decodeURIComponent(pathname === '/' ? '/index.html' : pathname);
  const filePath = resolve(distDirectory, `.${requestedPath}`);
  if (!filePath.startsWith(`${distDirectory}${sep}`) && filePath !== resolve(distDirectory, 'index.html')) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  const target = existsSync(filePath) ? filePath : resolve(distDirectory, 'index.html');
  const contentTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp'
  };
  response.writeHead(200, { 'Content-Type': contentTypes[extname(target)] || 'application/octet-stream' });
  response.end(readFileSync(target));
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) {
    try {
      await handleApi(request, response, url);
    } catch (error) {
      console.error(error);
      if (!response.headersSent) sendJson(response, 500, { error: 'The request could not be completed.' });
      else response.end();
    }
    return;
  }

  if (production && ['GET', 'HEAD'].includes(request.method)) {
    serveStatic(request, response, url.pathname);
    return;
  }

  sendJson(response, 404, { error: 'Not found.' });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Tensora admin API listening on http://127.0.0.1:${port}`);
});