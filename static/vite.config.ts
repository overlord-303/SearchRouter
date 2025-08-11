import { defineConfig } from 'vite';

export default defineConfig({
    root: './static',
    build: {
        outDir:      './../dist-static',
        assetsDir:   'assets-static',
        emptyOutDir: true,
    }
});
