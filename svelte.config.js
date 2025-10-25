import adapter from '@sveltejs/adapter-static';
import mdsvexConfig from './mdsvex.config.js';
import { mdsvex } from 'mdsvex'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svelte.md', '.md', '.svx'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'
    }),
    paths: {
      base: ''
    },
    prerender: {
      entries: [
        '*',
        '/projects',
        '/notes',
        '/projects/*',
        '/notes/*'
      ]
    }
  }
};

export default config;
