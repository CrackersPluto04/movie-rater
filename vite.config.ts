import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	base: '/movie-rater/dist/',

	build: {
		target: 'es2015',
		outDir: 'dist'
	}
});
