import { defineConfig } from 'vite';
import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import path from 'path';
import babel from 'vite-plugin-babel';
import viteImagemin from 'vite-plugin-imagemin';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    root: path.resolve(__dirname, 'src/app'),
    base: '/', // если деплой в корень домена

    plugins: [
        babel(),

        handlebarsPlugin({
            templateFileExtension: 'hbs',
            partialDirectoryPath: path.resolve(__dirname, 'src'),
            optimizePartialRegistration: true,
            compileOptions: { preventIndent: true },
        }),

        // Оптимизация изображений на сборке
        viteImagemin({
            // JPEG
            mozjpeg: {
                quality: 75,
            },
            // PNG
            pngquant: {
                quality: [0.7, 0.85],
                speed: 3,
            },
            // SVG
            svgo: true,
            // GIF
            gifsicle: {
                optimizationLevel: 3,
            },
            // Включайте webp только если реально используете webp-ассеты
            webp: {
                quality: 75,
            },
        }),

        // Генерация .gz для ассетов (nginx: gzip_static on;)
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 1024,
            deleteOriginFile: false,
        }),

        // Генерация .br для ассетов (nginx: brotli_static on; если модуль есть)
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 1024,
            deleteOriginFile: false,
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
        emptyOutDir: true,
        assetsDir: 'assets',

        // Минификация
        minify: 'terser', // более “жёстко”, чем esbuild
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },

        cssCodeSplit: true,
        sourcemap: false,

        // (опционально) чтобы было ещё проще дебажить и деплоить
        manifest: true,

        // Хэшированные имена (Vite и так делает, но оставим явно)
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },

    server: {
        port: 3000,
        open: true,
        proxy: {
            '/api/v1': {
                target: 'http://localhost:8080',
                secure: false,
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/api\/v1/, ''),
            },
            '/minio': {
                target: 'http://localhost:9000',
                changeOrigin: true,
                secure: false,
                rewrite: (p) => p.replace(/^\/minio/, ''),
            },
        },
        hmr: {
            host: 'localhost',
            protocol: 'ws',
            port: 3000,
        },
    },
});
