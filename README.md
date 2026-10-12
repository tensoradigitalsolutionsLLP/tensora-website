# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Google Sheets Contact Form

The contact form writes submissions to the first tab of the configured Google spreadsheet through the Apps Script in `google-apps-script/Code.gs`.

1. Open the target spreadsheet, choose **Extensions > Apps Script**, and paste in `google-apps-script/Code.gs`.
2. Save, then choose **Deploy > New deployment > Web app**. Set **Execute as** to your account and grant public website visitors access to the web app. Authorize the script when prompted.
3. Copy the deployed web app URL ending in `/exec` into `.env.local`:

	```env
	VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/your-deployment-id/exec
	```

4. Restart the Vite server. Configure the same environment variable in the production hosting environment before building/deploying the site.

The script creates the column headers if the first tab is empty. Public web app access allows unauthenticated visitors to submit contact details; protect the sheet's sharing settings and monitor submissions for spam.

## Portfolio Admin

Open `/admin` to edit the website's portfolio projects. The admin API checks credentials on the server, sets an HTTP-only session cookie, and stores edits in `data/projects.json`.

Project images are optional. Upload PNG, JPEG, WebP, or GIF files up to 5 MB; they are stored under `data/project-images` and shown in the portfolio cards and detail views.

Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local` for development and as server environment variables in production. Do not prefix these with `VITE_`; that would expose them to browser code. Use a strong, unique password before making the admin portal public. The production server requires Node.js and writable persistent storage for `data/projects.json`.

Run `npm run dev` for the Vite site plus the admin API. After `npm run build`, use `npm start` to serve the production site and API together.
