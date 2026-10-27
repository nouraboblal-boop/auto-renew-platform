import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (filename) => readFileSync(new URL(`../${filename}`, import.meta.url), 'utf8');
const required = [
  'src/components/Navbar.tsx',
  'src/components/Hero.tsx',
  'src/components/Services.tsx',
  'src/components/InteractiveEstimator.tsx',
  'src/components/EVFeatures.tsx',
  'src/components/Footer.tsx',
  'src/components/ui/button.tsx',
  'src/components/ui/tabs.tsx'
];

test('modular production components exist', () => {
  required.forEach(file => assert.ok(existsSync(new URL(`../${file}`, import.meta.url)), file));
});

test('homepage composes upgraded sections', () => {
  const page = read('src/app/page.tsx');
  for (const component of ['Navbar','Hero','Services','EVFeatures','InteractiveEstimator','Footer']) {
    assert.match(page, new RegExp(`<${component}\\s*/>`));
  }
});

test('package declares motion and shadcn-compatible dependencies', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.dependencies['framer-motion'], '13.4.5');
  assert.equal(pkg.dependencies['@radix-ui/react-tabs'], '1.2.1');
  assert.equal(pkg.dependencies['@radix-ui/react-slot'], '1.5.0');
  assert.equal(pkg.dependencies['class-variance-authority'], '0.7.1');
  assert.equal(pkg.dependencies['tailwind-merge'], '3.7.0');
});

test('motion implementation respects reduced motion', () => {
  assert.match(read('src/components/Hero.tsx'), /useReducedMotion/);
  assert.match(read('src/app/globals.css'), /prefers-reduced-motion/);
});
