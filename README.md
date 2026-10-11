# PixelForge Studio

A thoughtful, responsive digital-studio website built with the Next.js App Router, TypeScript, Tailwind CSS, and Prisma. **PixelForge Studio and every project, client, and project brief shown on this website are fictional.** Project photography illustrates these fictional concepts; none of the work represents a real client engagement.

## Features

- Responsive home, services, portfolio, about, contact, and project-detail pages.
- Six fictional concept projects with interactive category filters and individual case studies.
- Accessible enquiry form with browser and server-side Zod validation, spam-honeypot protection, submission states, and Prisma-backed storage.
- Private enquiry inbox with an expiring, signed, HTTP-only administrator session.
- Open Graph and Twitter sharing metadata, a generated sharing image, `sitemap.xml`, and `robots.txt`.
- Keyboard-accessible mobile navigation, skip link, and reduced-motion support.
- Unit tests and browser-level Playwright smoke tests.

## Requirements

- Node.js 22.17 or newer (tested with Node.js 24).
- npm 10 or newer.
- SQLite for local development. A **persistent disk** is required when running the SQLite database in production.

## Run locally

1. Install the dependencies: `npm ci`.
2. Create a local environment file: `cp .env.example .env`.
3. Set `ADMIN_PASSWORD` to a unique password and `ADMIN_SESSION_SECRET` to at least 32 random characters. For example, generate the session secret with `openssl rand -hex 32`.
4. Create and apply the database migration: `npm run db:migrate -- --name init`.
5. Start the development server: `npm run dev`.
6. Visit [http://localhost:3000](http://localhost:3000). The private administrator inbox is at [http://localhost:3000/admin](http://localhost:3000/admin).

The SQLite database is `prisma/dev.db` and is ignored by Git. Never commit `.env`, real enquiries, passwords, or session secrets. Before running migrations, set `DATABASE_URL` in `.env`; the example value `file:./dev.db` stores the database relative to the Prisma schema.

## Tests and production build

- `npm test` runs the TypeScript unit tests for project data and server-side form validation.
- `npm run test:e2e` runs Playwright tests against the production build using a development-only, self-contained Chromium runtime. Each scenario runs in its own Playwright process for compatibility with isolated Linux containers. The browser tests cover desktop and mobile navigation, category filters, project details, contact form success and validation, and protected administrator access.
- `npm run typecheck` checks TypeScript.
- `npm run build` generates the Prisma client and builds the optimized Next.js production app.
- `npm run start` serves the production build.
- `npm run db:deploy` applies committed Prisma migrations. `npm run db:studio` opens Prisma Studio.

The browser smoke tests create enquiries in the configured SQLite database. Point `DATABASE_URL` at a disposable test database before running them if you also run a local development database.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Prisma SQLite URL, for example `file:./dev.db`. |
| `ADMIN_PASSWORD` | Administrator sign-in password; use a unique secret in production. |
| `ADMIN_SESSION_SECRET` | Secret for signing administrator sessions; provide at least 32 unpredictable characters. |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL used by metadata, sitemap, and social previews. |

All four values should be configured by the host. No working production password or credentials are included.

## Deployment

This application uses SQLite for a simple self-hosted deployment. **It is not suitable for ephemeral or multi-instance serverless deployments:** the production database must live on a persistent disk that is mounted at the same path across deploys, migrations, and application restarts. Deploy on a single-instance host that supports persistent volumes, such as Railway with a persistent volume or Render with a persistent disk.

1. Push the repository to your Git provider and create a single-instance Node.js service on your persistent-disk host. Use Node.js 22.17 or newer.
2. Set the build command to `npm ci && npm run build` and the start command to `npm start`.
3. Attach a persistent volume mounted at `/data`. Set `DATABASE_URL=file:/data/pixelforge.db`; choose an absolute, writable path on the mounted volume.
4. Set `ADMIN_PASSWORD` and a newly generated, private `ADMIN_SESSION_SECRET` in the host's encrypted environment-variable settings.
5. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS URL, commit the Prisma migration created during local development, and run `npm run db:deploy` as the host's pre-deploy migration command.
6. Redeploy, visit `/admin`, and confirm that you can sign in. Check `/sitemap.xml`, `/robots.txt`, and `/opengraph-image` on the deployed domain.

Mount and back up the database volume: restoring an application deployment alone does not restore enquiry data. Restrict administrator credentials to trusted operators. A durable managed PostgreSQL database is preferable for multi-instance or serverless hosting; switch the Prisma datasource and deploy a compatible provider migration before using this application on those platforms. The administrator sign-in currently uses a single shared environment-configured password.

## Fictional portfolio notice

This studio website and every portfolio client, project, brief, and case study on it are fictional demonstrations, not claimed client work, independently verified outcomes, awards, or testimonials. The example email address uses the reserved `.example` domain. Before using the project as a real business website, replace this demo identity and contact address, review the privacy notice and data-retention requirements for your jurisdiction, and configure a production database with durable backups.
