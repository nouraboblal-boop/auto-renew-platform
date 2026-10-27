# syntax=docker/dockerfile:1.7
# Multi-stage production image for Next.js standalone output.
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
# npm ci is used automatically after a verified package-lock.json is committed.
# Until then, npm install keeps the initial pipeline runnable (non-reproducible transitives).
RUN --mount=type=cache,target=/root/.npm \
    if [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund; \
    else \
      echo 'WARNING: package-lock.json missing. Run npm install and commit the lockfile for reproducible builds.'; \
      npm install --no-audit --no-fund; \
    fi

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* is compiled into browser JS; configure before building.
ARG NEXT_PUBLIC_WHATSAPP_NUMBER=""
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=${NEXT_PUBLIC_WHATSAPP_NUMBER}
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
