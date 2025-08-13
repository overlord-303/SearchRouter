import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
        }),
    ],
    build: {
        outDir:    'dist',
        assetsDir: 'assets',
        target:    'es2022',
        minify:    'esbuild',
    }
});
