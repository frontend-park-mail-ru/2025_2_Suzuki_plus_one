/**
 * @module main
 * @description Entry point, initializes SPA + manages rendering
 */
import App from '../components/App.js';
import React from './react.js';
import { setGlobalReact } from './router.js';

function main() {
    const root = document.querySelector('#root');
    if (!root) {
        console.error('main: Root element not found');
        return;
    }
    const react = new React(root, App);
    setGlobalReact(react);
    const app = React.createElement(App);
    react.render(app);
}

document.addEventListener('DOMContentLoaded', main);