import Header from '@shared/components/Header/Header.js';
import Footer from '@shared/components/Footer/Footer.js';
import {getAccessToken, isTokenValid, clearAccessToken, refreshAccessToken, setAccessToken} from '@shared/utils/auth.js';
import { signOut } from '@shared/api/signOut.js';
import {getUserInfo} from '@shared/api/userApi.js'
/** Class representing the main application.
 * Handles page rendering, user authentication state, and header/footer setup.
 */
class App {
    /** @type {HTMLElement} The root container of the application */
    #container;
    /** @type {HTMLElement} The container for the main page content */
    #main_content;
    /**
     * Creates an instance of the App.
     * Initializes the main container, main content, and user authorization state.
     */
    constructor() {
        this.#container = document.createElement('div');
        this.#container.className = 'app-container';
        this.#main_content = document.createElement('div');
        this.#main_content.className = 'main-content';
        /** @type {boolean} Indicates whether a user is logged in */
        this.isAuthorized = false;
        this.user = null;
        this.setUp();
        this.restoreSession();
        // this.checkAuthOnLoad();
    }

    async restoreSession() {
        try {
            const token = await refreshAccessToken();
            this.isAuthorized = true;
            this.updateUserInfo();
        } catch {
            this.isAuthorized = false;
            this.user = null;
            clearAccessToken();
        }

        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    checkAuthOnLoad() {
            if (isTokenValid()) {
                this.isAuthorized = true;
            } else {
                this.isAuthorized = false;
                this.user = null;
                clearAccessToken();
            }
        }

    /**
     * Sets up the header and footer components and appends them to the container.
     * @returns {void}
     */
    setUp() {
        const headerContainer = document.createElement('div');
        this.#container.appendChild(headerContainer);

        this.header = new Header(headerContainer, this);
        this.header.render();

        this.#container.appendChild(this.#main_content);

        const footerContainer = document.createElement('div');
        this.#container.appendChild(footerContainer);

        const footer = new Footer(footerContainer);
        footer.render();
    }

    renderWithContainer(mainContentContainer) {
        this.#main_content.innerHTML = '';
        this.#main_content.appendChild(mainContentContainer);
        this.header.render();
        window.scrollTo({ top: 0, behavior: 'instant' });
        return this.#container;
    }

    /**
     * Logs in the user, updates authorization state, and set home page.
     * @returns {void}
     */
    loginUser(token) {
        setAccessToken(token); 
        this.isAuthorized = true;
        this.updateUserInfo();
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    /**
     * Logs out the user, clears authorization state, removes token, and navigates to home.
     * @returns {void}
     */
    async logoutUser() {
        const { success, error } = await signOut();
        if (success) {
            this.isAuthorized = false;
            this.user = null;
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }
        return { success, error };
    }

    async updateUserInfo() {
        try {
            const userInfo = await getUserInfo();
            this.user = userInfo;
            this.isAuthorized = true;
            this.header.render();
        } catch (err) {
            console.error('Failed to fetch user info:', err);
            this.isAuthorized = false;
            this.user = null;
            clearAccessToken();
            this.header.render();
        }
    }
}

export default App;
