/**
 * @module main
 * @description Entry point, initializes SPA + manages rendering
 */
import App from '../components/App.js'

function initApp() {
    const root = document.getElementById('root')
    const app = new App()
    root.appendChild(app.render())
}

document.addEventListener('DOMContentLoaded', initApp)
