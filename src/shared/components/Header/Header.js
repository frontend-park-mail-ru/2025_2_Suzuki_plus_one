import './styles/header.scss';
import './styles/input.scss';
import headerTemplate from './ui/Header.hbs';
import dropdownTemplate from './ui/SearchDropdown.hbs';
import logo from '@assets/images/logo.svg';
import searchIcon from '@assets/images/icons/search.svg';
import { search } from '@shared/api/search.js';

class Header {
    #parent;
    #app;
    #searchResults = null;
    #isRendered = false;
    #lastAuthState = null;
    
    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
        this.#parent.style.setProperty('--search-icon', `url(${searchIcon})`);
    }

    render() {
            const currentAuthState = this.#app.isAuthorized;

            if (!this.#isRendered || this.#lastAuthState !== currentAuthState) {
                this.#lastAuthState = currentAuthState;
                
                this.#parent.innerHTML = headerTemplate({
                    isAuthorized: this.#app.isAuthorized,
                    user: this.#app.user || {},
                });

                this.#setupEventsOnce();
                this.#isRendered = true;
            }



            this.#renderDropdown();
        }

    #setupEventsOnce() {
        this.#parent.querySelectorAll('[data-navigate]').forEach(el => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => router.navigate(el.dataset.navigate));
        });

        this.#highlightActiveLink();

        if (this.#app.isAuthorized) {
            this.#parent.querySelector('#logOutBtn')?.addEventListener('click', () => {
                this.#app.logoutUser();
            });
        }

        const input = this.#parent.querySelector('#searchInput');
        if (input) {
            input.addEventListener('input', async (e) => {
                const query = e.target.value.trim();

                if (!query) {
                    this.#searchResults = null;
                } else {
                    try {
                        const data = await search(query);
                        this.#searchResults = data?.[0] || { actors: [], medias: [] };
                    } catch (err) {
                        console.error(err);
                        this.#searchResults = null;
                    }
                }

                this.#renderDropdown();
            });

            input.addEventListener('focus', () => this.#renderDropdown());
        }

        document.addEventListener('click', (e) => {
                if (!this.#parent.contains(e.target)) {
                    this.#parent.querySelector('#searchDropdown')?.classList.remove('active');
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.#parent.querySelector('#searchDropdown')?.classList.remove('active');
                }
            });
    }

    #renderDropdown() {
        const dropdown = this.#parent.querySelector('#searchDropdown');
        if (!dropdown) return;

        dropdown.innerHTML = dropdownTemplate({
            searchResults: this.#searchResults
        });

        const hasResults = this.#searchResults && 
            (this.#searchResults.actors?.length > 0 || this.#searchResults.medias?.length > 0);

        const hasQuery = this.#parent.querySelector('#searchInput')?.value.trim().length > 0;

        if (hasResults || (hasQuery && this.#searchResults !== null)) {
            dropdown.classList.add('active');
        } else {
            dropdown.classList.remove('active');
        }
    }
    #highlightActiveLink() {
        const currentPath = window.location.pathname;
        const links = this.#parent.querySelectorAll('.header__menu-link');
    
        links.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('header__menu-link--active');
            } else {
                link.classList.remove('header__menu-link--active');
            }
        });
    }
    
}

export default Header;