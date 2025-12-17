import './styles/header.scss';
import './styles/input.scss';
import headerTemplate from './ui/Header.hbs';
import dropdownTemplate from './ui/SearchDropdown.hbs';
import logo from '@assets/images/logo.svg';
import searchIcon from '@assets/images/icons/search.svg';
import { search } from '@shared/api/search.js';
import { createNewPayment } from '@shared/api/paymentApi.js';
import { getUserInfo } from '@shared/api/userApi.js';

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
        this.isMobileOpen = false;
    }

    render() {
        const currentAuthState = this.#app.isAuthorized;

        if (!this.#isRendered || this.#lastAuthState !== currentAuthState) {
            this.#lastAuthState = currentAuthState;

            this.#parent.innerHTML = headerTemplate({
                searchIcon,
                isAuthorized: this.#app.isAuthorized,
                user: this.#app.user || {},
            });

            this.#setupEventsOnce();
            this.#isRendered = true;
        } else if (this.#app.isAuthorized && this.#app.user) {
            this.#updateUserInfoInDOM();
        }

        this.#renderDropdown();
        this.#highlightActiveLink();
        // this.#setupSubscribeButton();

    }

    #setupEventsOnce() {
        // this.#parent.querySelectorAll('[data-navigate]').forEach(el => {
        //     el.style.cursor = 'pointer';
        //     el.addEventListener('click', () => router.navigate(el.dataset.navigate));
        // });

        this.#highlightActiveLink();

        if (this.#app.isAuthorized) {
            this.#parent.querySelector('#logOutBtn')?.addEventListener('click', () => {
                this.#app.logoutUser();
            });
        }

        const wrapper = this.#parent.querySelector('#searchWrapper');
        const input = this.#parent.querySelector('#searchInput');
        const toggleBtn = wrapper.querySelector('#searchToggle');
        const closeBtn = wrapper.querySelector('#searchCloseBtn');
        const dropdown = this.#parent.querySelector('#searchDropdown');

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            input.classList.add('active');
            dropdown.classList.add('active');
            toggleBtn.classList.add('active');
            this.isMobileOpen = true;
            setTimeout(() => input.focus(), 0);
            this.#renderDropdown();
        });

        if (input) {
            input.addEventListener('input', async (e) => {
                const query = e.target.value.trim();

                if (!query) {
                    this.#searchResults = null;
                } else {
                    try {
                        const data = await search(query);
                        this.#searchResults = data || {
                            actors: [],
                            medias: [],
                        };
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
            if (!wrapper.contains(e.target)) {
                // wrapper — блок search
                dropdown.classList.remove('active');
                closeBtn.classList.remove('active');
                input.classList.remove('active');
                input.value = '';
                toggleBtn.classList.remove('active');
                this.isMobileOpen = false;
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.#parent.querySelector('#searchDropdown')?.classList.remove('active');
                closeBtn.classList.remove('active');
                input.classList.remove('active');
                input.value = '';
                toggleBtn.classList.remove('active');
            }
        });

        closeBtn?.addEventListener('click', () => {
            this.#parent.querySelector('#searchDropdown')?.classList.remove('active');
            closeBtn.classList.remove('active');
            input.classList.remove('active');
            toggleBtn.classList.remove('active');
            input.value = '';
        });
    }

    #renderDropdown() {
        const dropdown = this.#parent.querySelector('#searchDropdown');
        const searchCloseBtn = this.#parent.querySelector('#searchCloseBtn');
        const input = this.#parent.querySelector('#searchInput');
        const toggleBtn = this.#parent.querySelector('#searchToggle');

        if (!dropdown) return;

        dropdown.innerHTML = dropdownTemplate({
            searchResults: this.#searchResults,
        });

        const hasResults =
            this.#searchResults &&
            (this.#searchResults.actors?.length > 0 || this.#searchResults.medias?.length > 0);

        const hasQuery = this.#parent.querySelector('#searchInput')?.value.trim().length > 0;

        if (hasResults || (hasQuery && this.#searchResults !== null) || this.isMobileOpen) {
            dropdown.classList.add('active');
            searchCloseBtn.classList.add('active');
            input.classList.add('active');
        } else {
            dropdown.classList.remove('active');
            searchCloseBtn.classList.remove('active');
            input.classList.remove('active');
            toggleBtn.classList.remove('active');
            this.isMobileOpen = false;
        }
    }
    #highlightActiveLink() {
        const currentPath = window.location.pathname;
        const links = this.#parent.querySelectorAll('.header__menu-link');

        links.forEach((link) => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('header__menu-link--active');
            } else {
                link.classList.remove('header__menu-link--active');
            }
        });
    }

    async #setupSubscribeButton() {
    const subscribeButton = this.#parent.querySelector('#subscribeBtn');
    if (!subscribeButton) return;

    if (this.#app.isAuthorized) {
        try {
            const userInfo = await getUserInfo();

            if (userInfo.subscription_status === 'active') {
                subscribeButton.textContent = 'Subscribed';
                subscribeButton.disabled = true;
                subscribeButton.classList.add('subscribed');
                return;
            }
        } catch (error) {
            console.error('Failed to check subscription:', error);
            this.#showToast('Failed to check subscription status', 'error');
        }
    }

    subscribeButton.addEventListener('click', async () => {
        if (!this.#app.isAuthorized) {
            this.#showToast('Log in to subscribe', 'auth');
            return;
        }

        subscribeButton.disabled = true;
        subscribeButton.textContent = 'Redirecting...';

        try {
            await createNewPayment();
        } catch (error) {
            console.error('Payment failed:', error);
            this.#showToast('Failed to start subscription. Try again later.', 'error');
            subscribeButton.disabled = false;
            subscribeButton.textContent = 'Get subscription';
        }
    });
}
#showToast(message, type = 'auth') {
    const existingToast = document.querySelector('.action-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `action-toast action-toast--${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);
    toast.offsetHeight;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3500);
}


    #updateUserInfoInDOM() {
        const avatarEl = this.#parent.querySelector('.header__avatar');
        const usernameEl = this.#parent.querySelector('.header__username');
        const userLink = this.#parent.querySelector('.header__user');

        if (!avatarEl || !usernameEl) return;

        if (this.#app.user.avatar_url) {
            if (avatarEl.tagName === 'IMG') {
                avatarEl.src = this.#app.user.avatar_url;
            } else {
                const img = document.createElement('img');
                img.src = this.#app.user.avatar_url;
                img.alt = this.#app.user.username;
                img.className = 'header__avatar';
                avatarEl.replaceWith(img);
            }
        }

        if (usernameEl) {
            usernameEl.textContent = this.#app.user.username;
        }

        if (userLink) {
            userLink.dataset.navigate = '/account/settings';
        }
    }
}

export default Header;
