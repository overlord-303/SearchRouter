import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        VitePWA({
            srcDir:         'src',
            filename:       'sw.ts',
            strategies:     'injectManifest',

            injectRegister: null,
            registerType:   'autoUpdate',
        }),
    ],
    build: {
        outDir:    'dist',
        assetsDir: 'assets',
    }
});
