import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';


export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG'],
  plugins: [enhancedImages(), sveltekit(),]
});
