import './styles/header.scss';
import './styles/input.scss';
import template from './ui/Header.hbs';
import logo from '@assets/images/logo.svg';
import searchIcon from '@assets/images/icons/search.svg';
import { search, debouncedSearch } from '@shared/api/search.js';

class Header {
    #parent;
    #app;
    #searchResults = null;

    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
        this.#parent.style.setProperty('--search-icon', `url(${searchIcon})`);
    }

    render() {
        this.#render();
        this.#setupSearch();
        this.#setupLogout();
    }

    #render() {
        this.#parent.innerHTML = template({
            isAuthorized: this.#app.isAuthorized,
            user: this.#app.user,
            searchResults: this.#searchResults,
        });

        this.#parent.querySelectorAll('[data-navigate]').forEach(el => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => router.navigate(el.dataset.navigate));
        });
    }

    #setupLogout() {
        if (this.#app.isAuthorized) {
            this.#parent.querySelector('#logOutBtn')?.addEventListener('click', () => {
                this.#app.logoutUser();
            });
        }
    }

    #setupSearch() {
        const input = this.#parent.querySelector('#searchInput');
        if (!input) return;

        const doSearch = debouncedSearch(async (query) => {
            query = query.trim();
            if (!query) {
                this.#searchResults = null;
                this.#render();
                return;
            }

            try {
                const data = await search(query);
                this.#searchResults = data?.[0] || { actors: [], medias: [] };
            } catch (err) {
                this.#searchResults = null;
            }
            this.#render();
        });

        input.addEventListener('input', e => doSearch(e.target.value));

        input.addEventListener('focus', () => {
            if (this.#searchResults) this.#render();
        });
    }
}

export default Header;
