/**
 * @module main
 * @description Entry point, initializes SPA + manages rendering
 */
import App from './App.js';
/**
 * Initializes the application and renders it into the root element.
 * @function
 * @returns {void}
 */
function initApp() {
    const root = document.getElementById('root');
    const app = new App();
    root.appendChild(app.render());
}
/**
 * Waits for the DOM to be fully loaded, then initializes the app.
 */
document.addEventListener('DOMContentLoaded', initApp);
