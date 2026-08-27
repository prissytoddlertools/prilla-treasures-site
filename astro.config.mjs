// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://prillatreasures.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
