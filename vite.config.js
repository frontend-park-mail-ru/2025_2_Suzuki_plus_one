import { defineConfig } from 'vite';
import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import path from 'path';
import babel from 'vite-plugin-babel';

export default defineConfig({
    root: path.resolve(__dirname, 'src/app'),
    plugins: [
        babel(),
        handlebarsPlugin({
            templateFileExtension: 'hbs',
            partialDirectoryPath: path.resolve(__dirname, 'src'),
            optimizePartialRegistration: true,
            compileOptions: {
                preventIndent: true,
            },
        }),
    ],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@assets': path.resolve(__dirname, 'src/shared/assets'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
        @use "@shared/styles/normalize" as *;
        @use "@shared/styles/fonts" as *;
        @use "@shared/styles/variables" as *;
        @use "@shared/styles/mixins" as *;
        @use "@shared/styles/media" as *;
        @use "@shared/styles/utils" as *;
        @use "@shared/styles/globals" as *;
        @use "@shared/styles/blocks/button" as *;
        @use "@shared/styles/blocks/description" as *;
        @use "@shared/styles/blocks/section" as *;
      `,
            },
        },
    },
    build: {
        outDir: path.resolve(__dirname, 'public'),
        assetsDir: 'assets',
    },
    server: {
        port: 3000,
        open: true,
        proxy: {
      '/api/v1': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      },
      '/minio': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/minio/, ''),
      },
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      port: 3000,
    },
    },
});
