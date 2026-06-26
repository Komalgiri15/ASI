# TanStack Start on Vercel

This repository contains a TanStack Start application configured for deployment on Vercel using the Nitro Vercel preset.

## How It Works

1. **Nitro Integration**: The project uses `@lovable.dev/vite-tanstack-config` to build the application. The Nitro server preset is set to `"vercel"` in `vite.config.ts`, which automatically compiles the server-side logic into a Vercel Serverless Function and outputs static files according to the Vercel Build Output API (v3).
2. **Build Configuration**: The `vercel.json` file instructs Vercel to run `npm run build` and look for the output in the `.vercel/output` directory. It uses `"framework": null` to allow Nitro's generated folder structure to be deployed exactly as built.

---

## Deployment Options

### Option 1: Git Integration (Recommended)

The easiest way to deploy is to link your GitHub repository to Vercel:

1. Push your changes to your Git repository (synced automatically via Lovable).
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** > **Project**.
3. Import your repository.
4. Vercel will automatically detect the settings from `vercel.json`.
5. Click **Deploy**. Future pushes to your branch will trigger automatic deployments.

### Option 2: Command Line (Vercel CLI)

You can also deploy directly from your local terminal using the Vercel CLI.

1. **Link the Project** (first time only):
   ```bash
   npx vercel link
   ```
   Follow the prompts to select your Vercel organization and link or create a project.

2. **Deploy a Preview Build**:
   ```bash
   npm run deploy
   ```

3. **Deploy to Production**:
   ```bash
   npm run deploy:prod
   ```

---

## Configuration Files

The project contains the following Vercel-related configuration files:

- **[`vercel.json`](file:///d:/ASI/vercel.json)**: Configures the build command, install command, and output directory for the Vercel builder.
- **[`.vercelignore`](file:///d:/ASI/.vercelignore)**: Tells Vercel which files to ignore during the upload process.
- **[`vite.config.ts`](file:///d:/ASI/vite.config.ts)**: Configures Nitro with `preset: "vercel"` to target the Vercel runtime.
