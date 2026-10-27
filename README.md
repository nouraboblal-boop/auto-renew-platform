# Auto Renew Platform

Next.js 16 App Router website for Auto Renew: Arabic RTL automotive landing page, PPF, wrapping, EV diagnostics, DiLink services, interactive indicative-price estimator and a WhatsApp inquiry handoff.

**Repository:** https://github.com/nouraboblal-boop/auto-renew-platform (branch `main`). The source is prepared for CI and container publishing; a successful CI run and a public website deployment still require separate verification.

## Requirements

- Node.js 22+
- npm 10+
- Docker (optional for local image build)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the center's verified number (country code, digits only) in `.env.local`. Until it is configured, the booking button is intentionally disabled.

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

The contact form **opens a WhatsApp draft**, not an automatically delivered or confirmed booking. The user must explicitly send the message from WhatsApp. Estimator prices are illustrative USD placeholders until Auto Renew approves a price list.

## Dependency lockfile (important)

`package-lock.json` could not be generated in the execution environment because `registry.npmjs.org` DNS was unavailable. The Dockerfile and Actions pipeline include a temporary `npm install` fallback so they can run without a lockfile; that fallback does **not** guarantee fully reproducible transitive dependency versions. Once an environment with npm registry access is available, run:

```bash
npm install
npm ci
npm test
npm run typecheck
npm run lint
npm run build
```

**Commit the generated `package-lock.json`.** Both Docker and GitHub Actions will automatically use `npm ci` thereafter. Consider pinning dependency versions and enabling Dependabot updates as part of the release-hardening process.

Tailwind CSS v4 stores the live theme tokens in `src/app/globals.css` via `@theme`. `tailwind.config.ts` is included and loaded explicitly using `@config` for compatibility (Tailwind v4 does not auto-load the legacy file).

## Docker image

Next.js `output: 'standalone'` lets the final image include only the traced runtime files. Its runtime runs as an unprivileged user and exposes a health endpoint at `/api/health`.

```bash
docker build --build-arg NEXT_PUBLIC_WHATSAPP_NUMBER=963XXXXXXXXX -t auto-renew-platform:local .
docker run --rm -p 3000:3000 auto-renew-platform:local
curl -f http://localhost:3000/api/health
```

`963XXXXXXXXX` is a placeholder and **not a real business number**. The public WhatsApp variable is embedded into browser code *during the build*, so changing it on `docker run` does not change the frontend. Rebuild the image after updating it.

## GitHub Actions (`.github/workflows/deploy.yml`)

Runs on `main` pushes, PRs targeting `main`, and manual dispatch:

1. Checks out, installs dependencies, runs unit tests, TypeScript, ESLint and a production Next.js build.
2. Builds the Docker image and starts it, then requests `GET /api/health` as a smoke test.
3. **Only on a push to `main`:** logs into GitHub Container Registry using the repository `GITHUB_TOKEN` and publishes `ghcr.io/<owner>/<repo>:latest` plus an immutable `sha-<12chars>` tag.

This pipeline **publishes an image**, it does not deploy a live public website to a server. To deploy to a server, add an authorized deployment target and credentials. On a private repository, GHCR package permissions / visibility may need configuring.

In repository **Settings → Secrets and variables → Actions → Variables** create:

`NEXT_PUBLIC_WHATSAPP_NUMBER` = actual center international digits (not secret: public client config).

## GitHub collaboration

The application source lives in `nouraboblal-boop/auto-renew-platform` on branch `main`. The GitHub Actions workflow executes on each push and publishes a container only after its checks succeed. A GitHub push is not itself a production website deployment.

## Before public launch

- Confirm official center branding, logo, image licensing, domain, contact and WhatsApp number.
- Get written approval for service descriptions and actual pricing; check EV/DiLink model support.
- Review privacy/legal copy and any applicable local business requirements.
- Generate and commit `package-lock.json`, then perform successful `npm ci`, lint, typecheck, app build, Docker build, browser/accessibility tests.
- Secure GHCR package scope, configure an actual hosting provider, TLS and domain, then run post-deployment checks.
- FLOWSTACK Brick exact-version certification remains unverified (no installed exact-version Agent Knowledge available here), so no fictional Brick API was used.
