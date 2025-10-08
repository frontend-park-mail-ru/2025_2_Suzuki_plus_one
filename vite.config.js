import { defineConfig } from 'vite';
import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
    root: path.resolve(__dirname, 'src/app'),
    plugins: [
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
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
    server: {
        port: 3000, 
        open: true,
    },
});