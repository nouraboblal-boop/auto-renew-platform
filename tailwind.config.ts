/**
 * Tailwind v4 compatibility config.
 * The canonical design tokens are declared in src/app/globals.css via @theme.
 * Loaded explicitly using @config, since Tailwind v4 does not auto-discover TS configs.
 */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {} },
  plugins: []
};

export default config;
