/**
 * @module main
 * @description Entry point, initializes SPA + manages rendering
 */
import App from '../components/App.js'
import React from './react.js'
import { createElement } from './react.js'

/**
 * @function main
 * @description Initializes application and renders root component
 */
function main() {
    const root = document.querySelector('#root')
    if (!root) {
        console.error('main: Root element not found')
        return
    }
    const react = new React(root)
    if (!react) {
        console.error('main: React instance not created')
        return
    }
    const app = createElement(App)
    
    react.render(app)
}

document.addEventListener('DOMContentLoaded', main)
