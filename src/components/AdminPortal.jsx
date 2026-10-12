import { useEffect, useState } from 'react';
import { LayoutDashboard, LogOut, Plus, Save, ShieldCheck, Trash2 } from 'lucide-react';

const fieldClass = 'w-full rounded-lg border border-[#D8B070]/30 bg-[#071A33] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#D8B070] focus:ring-2 focus:ring-[#D8B070]/20';
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-300';

function createProject() {
  return {
    id: `proj-${crypto.randomUUID()}`,
    title: 'New project',
    category: 'Websites',
    client: 'Client name',
    year: String(new Date().getFullYear()),
    description: '',
    tags: [],
    stats: {},
    imageUrl: '',
    imageTheme: 'linear-gradient(135deg, #071A33 0%, #0D294A 55%, #D8B070 100%)',
    featured: false,
    accent: '#D8B070',
    typeBadge: 'Project'
  };
}

export default function AdminPortal() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draft, setDraft] = useState(null);
  const [tagsValue, setTagsValue] = useState('');
  const [statsValue, setStatsValue] = useState('{}');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/session', { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok && !cancelled) {
          setAuthenticated(true);
          return fetch('/api/projects').then((projectsResponse) => projectsResponse.json());
        }
        return null;
      })
      .then((data) => {
        if (data && !cancelled) loadProjects(data);
      })
      .catch(() => {
        if (!cancelled) setError('Could not connect to the admin service.');
      })
      .finally(() => {
        if (!cancelled) setCheckingSession(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function loadProjects(data) {
    setProjects(data);
    setSelectedIndex(0);
    setDraft(data[0] || null);
    setTagsValue(data[0]?.tags.join(', ') || '');
    setStatsValue(JSON.stringify(data[0]?.stats || {}, null, 2));
  }

  async function handleLogin(event) {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to sign in.');
      const projectsResponse = await fetch('/api/projects');
      const projectData = await projectsResponse.json();
      setAuthenticated(true);
      setPassword('');
      loadProjects(projectData);
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in.');
    }
  }

  function buildCurrentProjects() {
    if (!draft || !isDirty) return projects;
    let stats;
    try {
      stats = JSON.parse(statsValue);
    } catch {
      throw new Error('Statistics must be valid JSON.');
    }
    if (!stats || typeof stats !== 'object' || Array.isArray(stats)) {
      throw new Error('Statistics must be a JSON object.');
    }
    const currentProject = {
      ...draft,
      tags: tagsValue.split(',').map((tag) => tag.trim()).filter(Boolean),
      stats
    };
    return projects.map((project, index) => index === selectedIndex ? currentProject : project);
  }

  function selectProject(index) {
    try {
      const updatedProjects = buildCurrentProjects();
      const nextProject = updatedProjects[index];
      setProjects(updatedProjects);
      setSelectedIndex(index);
      setDraft(nextProject);
      setTagsValue(nextProject.tags.join(', '));
      setStatsValue(JSON.stringify(nextProject.stats, null, 2));
      setIsDirty(false);
      setError('');
      setNotice('');
    } catch (draftError) {
      setError(draftError.message);
    }
  }

  function addProject() {
    try {
      const updatedProjects = buildCurrentProjects();
      const newProject = createProject();
      const nextProjects = [...updatedProjects, newProject];
      setProjects(nextProjects);
      setSelectedIndex(nextProjects.length - 1);
      setDraft(newProject);
      setTagsValue('');
      setStatsValue('{}');
      setIsDirty(true);
      setError('');
      setNotice('New project added. Save changes to publish it.');
    } catch (draftError) {
      setError(draftError.message);
    }
  }

  function deleteProject() {
    if (!draft || !window.confirm(`Delete “${draft.title}”? This takes effect after saving.`)) return;
    const nextProjects = projects.filter((_, index) => index !== selectedIndex);
    setProjects(nextProjects);
    setSelectedIndex(Math.max(0, selectedIndex - 1));
    setDraft(nextProjects[Math.max(0, selectedIndex - 1)] || null);
    setTagsValue(nextProjects[Math.max(0, selectedIndex - 1)]?.tags.join(', ') || '');
    setStatsValue(JSON.stringify(nextProjects[Math.max(0, selectedIndex - 1)]?.stats || {}, null, 2));
    setIsDirty(true);
    setError('');
    setNotice('Project removed. Save changes to publish the update.');
  }

  async function saveProjects() {
    setError('');
    setNotice('');
    let nextProjects;
    try {
      nextProjects = buildCurrentProjects();
    } catch (saveError) {
      setError(saveError.message);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: nextProjects })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to save projects.');
      setProjects(nextProjects);
      setDraft(nextProjects[selectedIndex] || null);
      setIsDirty(false);
      setNotice(`Saved ${data.count} projects.`);
    } catch (saveError) {
      setError(saveError.message || 'Unable to save projects.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' });
    setAuthenticated(false);
    setProjects([]);
    setDraft(null);
    setPassword('');
  }

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
    setIsDirty(true);
    setNotice('');
  }

  async function uploadProjectImage(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Choose an image smaller than 5 MB.');
      return;
    }

    setIsUploadingImage(true);
    setError('');
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Could not read the selected image.'));
        reader.readAsDataURL(file);
      });
      const response = await fetch('/api/admin/project-image', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl, mimeType: file.type })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Image upload failed.');
      updateDraft('imageUrl', data.imageUrl);
      setNotice('Image uploaded. Save changes to attach it to this project.');
    } catch (uploadError) {
      setError(uploadError.message || 'Image upload failed.');
    } finally {
      setIsUploadingImage(false);
    }
  }

  if (checkingSession) {
    return <main className="min-h-screen bg-[#071A33] p-8 text-sm text-gray-300">Checking admin session…</main>;
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#071A33] px-4 py-12 text-white">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-2xl border border-[#D8B070]/30 bg-[#0B1220] p-7 shadow-2xl sm:p-9">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#D8B070]/40 bg-[#D8B070]/10 text-[#D8B070]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="font-mono-tech text-xs font-bold uppercase tracking-[0.2em] text-[#D8B070]">Tensora</p>
          <h1 className="mt-2 font-heading text-2xl font-bold">Portfolio Admin</h1>
          <p className="mt-2 text-sm text-gray-400">Sign in to manage the projects shown on the website.</p>
          <label className={`${labelClass} mt-7`} htmlFor="admin-username">Login ID</label>
          <input id="admin-username" className={fieldClass} autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
          <label className={`${labelClass} mt-4`} htmlFor="admin-password">Password</label>
          <input id="admin-password" className={fieldClass} type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
          <button className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#D8B070] px-4 py-3 text-sm font-bold text-[#071A33] transition hover:bg-[#E0C38A]" type="submit">Sign in</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071A33] text-white">
      <header className="border-b border-white/10 bg-[#0B1220]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-[#D8B070]" />
            <div>
              <h1 className="font-heading text-lg font-bold">Portfolio Admin</h1>
              <p className="text-xs text-gray-400">Manage website projects</p>
            </div>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-[#D8B070]/50 hover:text-[#E0C38A]">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-300">Projects ({projects.length})</h2>
            <button onClick={addProject} aria-label="Add project" title="Add project" className="rounded-md p-2 text-[#D8B070] transition hover:bg-white/10">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1">
            {projects.map((project, index) => (
              <button key={project.id} onClick={() => selectProject(index)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${selectedIndex === index ? 'bg-[#D8B070]/15 text-[#E0C38A]' : 'text-gray-300 hover:bg-white/5'}`}>
                <span className="block truncate font-semibold">{project.title}</span>
                <span className="mt-0.5 block text-xs text-gray-500">{project.category} · {project.year}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="min-w-0 rounded-xl border border-white/10 bg-[#0B1220] p-5 sm:p-7">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <h2 className="font-heading text-xl font-bold">Project details</h2>
              <p className="mt-1 text-sm text-gray-400">Edits remain drafts until saved.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={deleteProject} disabled={!draft} className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-400/10 disabled:opacity-40">
                <Trash2 className="h-4 w-4" /> Delete
              </button>
              <button onClick={saveProjects} disabled={isSaving || isUploadingImage || !isDirty} className="inline-flex items-center gap-2 rounded-lg bg-[#D8B070] px-3.5 py-2 text-xs font-bold text-[#071A33] transition hover:bg-[#E0C38A] disabled:cursor-not-allowed disabled:opacity-50">
                <Save className="h-4 w-4" /> {isSaving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>

          {error && <p role="alert" className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p>}
          {notice && <p role="status" className="mb-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">{notice}</p>}

          {draft ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="project-title">Title</label>
                <input id="project-title" className={fieldClass} value={draft.title} onChange={(event) => updateDraft('title', event.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="project-client">Client</label>
                <input id="project-client" className={fieldClass} value={draft.client} onChange={(event) => updateDraft('client', event.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="project-category">Category</label>
                <input id="project-category" className={fieldClass} value={draft.category} onChange={(event) => updateDraft('category', event.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="project-year">Year</label>
                <input id="project-year" className={fieldClass} value={draft.year} onChange={(event) => updateDraft('year', event.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="project-badge">Card badge</label>
                <input id="project-badge" className={fieldClass} value={draft.typeBadge} onChange={(event) => updateDraft('typeBadge', event.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="project-tags">Tags (comma-separated)</label>
                <input id="project-tags" className={fieldClass} value={tagsValue} onChange={(event) => { setTagsValue(event.target.value); setIsDirty(true); }} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="project-description">Description</label>
                <textarea id="project-description" className={`${fieldClass} min-h-24 resize-y`} value={draft.description} onChange={(event) => updateDraft('description', event.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="project-image">Project image (optional)</label>
                <div className="rounded-lg border border-dashed border-[#D8B070]/35 bg-[#071A33]/60 p-4">
                  <input id="project-image" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={uploadProjectImage} disabled={isUploadingImage} className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-[#D8B070] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#071A33] hover:file:bg-[#E0C38A] disabled:opacity-50" />
                  <p className="mt-2 text-xs text-gray-500">PNG, JPEG, WebP, or GIF. Maximum size: 5 MB.</p>
                  {isUploadingImage && <p role="status" className="mt-3 text-sm text-[#E0C38A]">Uploading image…</p>}
                  {draft.imageUrl && (
                    <div className="mt-4 flex flex-wrap items-start gap-4">
                      <img src={draft.imageUrl} alt={`Preview for ${draft.title}`} className="h-36 w-full max-w-xs rounded-lg border border-white/10 object-cover" />
                      <button type="button" onClick={() => updateDraft('imageUrl', '')} className="rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-red-300/50 hover:text-red-200">Remove image</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="project-image-theme">Thumbnail gradient</label>
                <input id="project-image-theme" className={fieldClass} value={draft.imageTheme} onChange={(event) => updateDraft('imageTheme', event.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="project-accent">Accent color</label>
                <div className="flex items-center gap-3">
                  <input id="project-accent" className="h-10 w-12 cursor-pointer rounded border border-white/20 bg-transparent p-1" type="color" value={draft.accent} onChange={(event) => updateDraft('accent', event.target.value)} />
                  <span className="font-mono-tech text-sm text-gray-300">{draft.accent}</span>
                </div>
              </div>
              <label className="flex items-center gap-2 self-end pb-2 text-sm text-gray-200">
                <input type="checkbox" checked={draft.featured} onChange={(event) => updateDraft('featured', event.target.checked)} className="h-4 w-4 accent-[#D8B070]" /> Featured project
              </label>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="project-stats">Statistics (JSON object)</label>
                <textarea id="project-stats" className={`${fieldClass} min-h-28 resize-y font-mono-tech text-xs`} value={statsValue} onChange={(event) => { setStatsValue(event.target.value); setIsDirty(true); }} spellCheck="false" />
              </div>
            </div>
          ) : (
            <p className="py-12 text-center text-sm text-gray-400">No projects yet. Add a project to begin.</p>
          )}
        </section>
      </div>
    </main>
  );
}