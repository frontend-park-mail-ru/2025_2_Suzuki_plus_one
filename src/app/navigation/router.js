import Home from '@pages/Home/Home.js';
import Login from '@pages/Login/Login.js';
import Signup from '@pages/Signup/Signup.js';
import FilmPage from '@pages/FilmPage/FilmPage.js';
import StarPage from '@pages/StarPage/StarPage.js';
import Player from '@widgets/Player/Player.js';
import Account from '@pages/Account/Account.js';
import NotFound from '@pages/NotFound/NotFound.js';
import NewAppeal from '@features/AppealCard/NewAppeal.js';
import CurrentAppeal from '@features/AppealCard/CurrentAppeal.js';


const routes = {
    '/': Home,
    '/login': Login,
    '/signup': Signup,

    '/account/:tab': Account,

    '/film/:id': FilmPage,
    '/actor/:id': StarPage,
    '/player/:id': Player,

    '/series': '/',
    '/films': '/',

    '*': NotFound,

    '/newAppeal' : NewAppeal,
    '/currentAppeal/:id': CurrentAppeal,
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
        if (routes[pathname] === '/') {
            return { Page: routes['/'], params: {} };
        }

        for (const route in routes) {
            const params = this.getParams(route, pathname);
            if (params !== null) {
                return { Page: routes[route], params };
            }
        }
        return { Page: routes['*'], params: {} };
    }

    async navigate(pathname = window.location.pathname) {
        const match = this.matchRoute(pathname);
        if (!match) {
            console.error('Route not found:', pathname);
            // return this.navigate('/');
            return;
        }

        const { Page, params } = match;

        const standaloneRoutes = ['/newAppeal', '/currentAppeal'];
        const isStandalone = standaloneRoutes.some(route =>
            pathname === route || pathname.startsWith(route + '/')
        );

        this.root.innerHTML = '';
        const pageContainer = document.createElement('div');
        // this.root.appendChild(this.#app.renderWithContainer(pageContainer));

        if (isStandalone) {
            this.root.appendChild(pageContainer);
        } else {
            this.root.appendChild(this.#app.renderWithContainer(pageContainer));
        }

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
