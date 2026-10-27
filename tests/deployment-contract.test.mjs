import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = (filename) => readFileSync(new URL(`../${filename}`, import.meta.url), 'utf8');

test('Docker image uses separated build and non-root standalone runtime', () => {
  const file = read('Dockerfile');
  assert.match(file, /FROM node:22-alpine AS deps/);
  assert.match(file, /FROM node:22-alpine AS builder/);
  assert.match(file, /FROM node:22-alpine AS runner/);
  assert.match(file, /\/app\/\.next\/standalone/);
  assert.match(file, /USER nextjs/);
  assert.match(file, /HEALTHCHECK/);
});

test('Next.js enables standalone output', () => {
  assert.match(read('next.config.ts'), /output:\s*["']standalone["']/);
});

test('deployment workflow verifies app and container before publishing', () => {
  const file = read('.github/workflows/deploy.yml');
  assert.match(file, /npm test/);
  assert.match(file, /npm run typecheck/);
  assert.match(file, /npm run lint/);
  assert.match(file, /npm run build/);
  assert.match(file, /docker build/);
  assert.match(file, /api\/health/);
  assert.match(file, /docker push/);
  assert.match(file, /refs\/heads\/main/);
});

test('release includes health endpoint and excludes secrets from image', () => {
  assert.ok(existsSync(new URL('../src/app/api/health/route.ts', import.meta.url)));
  const ignore = read('.dockerignore');
  assert.match(ignore, /^\.env\.\*$/m);
  assert.match(ignore, /^node_modules$/m);
  assert.match(read('.gitignore'), /^\.env\.\*$/m);
});
