/**
 * @module main
 * @description Entry point, initializes SPA + manages rendering
 */
import App from '@app/App.js';
import { Router } from '@app/navigation/router.js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
                console.log('SW registered:', registration);
            })
            .catch((error) => {
                console.error('SW registration failed:', error);
            });
    });
}

/**
 * Initializes the application and renders it into the root element.
 * @function
 * @returns {void}
 */
function initApp() {
    const root = document.getElementById('root');
    const app = new App();
    const router = new Router(app);
    router.init();
}

/**
 * Waits for the DOM to be fully loaded, then initializes the app.
 */
document.addEventListener('DOMContentLoaded', initApp);
