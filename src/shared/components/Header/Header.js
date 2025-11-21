import './styles/header.scss';
import './styles/input.scss';
import searchIcon from '@assets/images/icons/search.svg';
import template from './ui/Header.hbs';
import logo from '@assets/images/logo.svg';

/** Class representing the header of the website. */
class Header {
    #parent;
    #app;

    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
        this.#parent.style.setProperty('--search-icon', `url(${searchIcon})`);
    }

    render() {
        this.#parent.innerHTML = template({
            isAuthorized: this.#app.isAuthorized,
            logoUrl: logo,
            searchUrl: searchIcon,
            user: this.#app.user,
        });

        this.#highlightActiveLink();

        if (this.#app.isAuthorized) {
            this.#parent
                .querySelector('#logOutBtn')
                ?.addEventListener('click', async () => {
                    await this.#app.logoutUser();
                });
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
