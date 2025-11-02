import Header from '@shared/components/Header/Header.js';
import Footer from '@shared/components/Footer/Footer.js';
import { checkAuth } from '@shared/api/checkAuth.js'
import { signOut } from '@shared/api/signOut.js';

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
        this.checkAuthOnLoad();
    }

    async checkAuthOnLoad() {
        const { isAuthorized, user } = await checkAuth();
        this.isAuthorized = isAuthorized;
        this.user = user;
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
        this.header.render(); // Обновляем header (для авторизации)
        window.scrollTo({ top: 0, behavior: "instant" });
        return this.#container;
    }

    /**
     * Logs in the user, updates authorization state, and set home page.
     * @returns {void}
     */
    loginUser() {
        this.isAuthorized = true;
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
}

export default App;