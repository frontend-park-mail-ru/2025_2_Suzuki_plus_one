/**
 * @module main
 * @description Entry point, initializes SPA + manages rendering
 */
import App from '@app/App.js';
import { Router } from '@app/navigation/router.js';

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