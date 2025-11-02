import Home from '@pages/Home/Home.js';
import Login from '@pages/Login/Login.js';
import Signup from '@pages/Signup/Signup.js';
import FilmPage from '@pages/FilmPage/FilmPage.js';
import StarPage from '@pages/StarPage/StarPage.js';
import Player from '@widgets/Player/Player.js';

const routes = {
    '/': Home,
    '/login': Login,
    '/signup': Signup,
    '/film/:id': FilmPage,
    '/star/:id': StarPage,
    '/player': Player,
};

export class Router {
    #app;

    constructor(appInstance) {
        this.#app = appInstance;
        this.root = document.getElementById('root');
        if (!this.root) throw new Error('#root not found');
    }

    getParams(route, path) {
        const routeParts = route.split('/').filter(Boolean);
        const pathParts = path.split('/').filter(Boolean);
        if (routeParts.length !== pathParts.length) return null;

        const params = {};
        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
                params[routeParts[i].slice(1)] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
                return null;
            }
        }
        return params;
    }

    matchRoute(pathname) {
        for (const route in routes) {
            const params = this.getParams(route, pathname);
            if (params !== null) {
                return { Page: routes[route], params };
            }
        }
        return null;
    }

    async navigate(pathname = window.location.pathname) {
        const match = this.matchRoute(pathname);
        if (!match) {
            console.error('Route not found:', pathname);
            // return this.navigate('/');
            return;
        }

        const { Page, params } = match;

        this.root.innerHTML = '';
        const pageContainer = document.createElement('div');
        this.root.appendChild(this.#app.renderWithContainer(pageContainer));

        const pageInstance = new Page(pageContainer, this.#app, params);
        pageInstance.render();
        if (pageInstance.afterRender) pageInstance.afterRender();

        if (window.location.pathname !== pathname) {
            window.history.pushState({ path: pathname }, '', pathname);
        }
    }

    init() {
        document.body.addEventListener('click', (e) => {
            const target = e.target;

            let href = null;

            if (target.hasAttribute('data-navigate')) {
                href = target.getAttribute('data-navigate');
            } else if (target.closest('a[data-navigate]')) {
                href = target.closest('a[data-navigate]').getAttribute('href');
            }

            if (href && href.startsWith('/')) {
                e.preventDefault();
                this.navigate(href);
            }
        });

        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname);
        });

        this.navigate();
    }
}
