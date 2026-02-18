import { defineConfig } from 'vite';


export default defineConfig({
	base: './',
	logLevel: 'warning',
	server: {
		port: 8080
	},
	build: {
		outDir: 'docs'
	}
}
);
