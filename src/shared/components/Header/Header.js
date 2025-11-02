import './styles/header.scss'
import './styles/input.scss'
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
        });

        if (this.#app.isAuthorized) {
            this.#parent
                .querySelector('#logOutBtn')
                ?.addEventListener('click', async () => {
                    await this.#app.logoutUser();
                });
        }}
}

export default Header;