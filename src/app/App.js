import Header from '@shared/components/Header/Header.js';
import Footer from '@shared/components/Footer/Footer.js';
import Home from '@pages/Home/Home.js';
import Login from '@pages/Login/Login.js';
import Signup from '@pages/Signup/Signup.js';
import FilmPage from '@pages/FilmPage/FilmPage.js';
import StarPage from '@pages/StarPage/StarPage.js';
import Player from '@widgets/Player/Player.js';
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
        /** @type {string} Current page ('home', 'login', 'signup') */
        this.currentPage = 'home';
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
        this.render();
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
    /**
     * Renders the current page inside the main content container.
     * Creates and renders the components for 'home', 'login', or 'signup'.
     * @returns {HTMLElement} The root container element of the application.
     */
    render() {
        this.#main_content.innerHTML = '';

        if (this.currentPage === 'home') {
            const homeContainer = document.createElement('div');
            this.#main_content.appendChild(homeContainer);
            const home = new Home(homeContainer, this);
            home.render();
        } else if (this.currentPage === 'login') {
            const loginContainer = document.createElement('div');
            this.#main_content.appendChild(loginContainer);

            const login = new Login(loginContainer, this);
            login.render();
        } else if (this.currentPage === 'signup') {
            const signupContainer = document.createElement('div');
            this.#main_content.appendChild(signupContainer);

            const signup = new Signup(signupContainer, this);
            signup.render();
        }
        else if (this.currentPage === 'filmPage') {
            const filmPageContainer = document.createElement('div');
            this.#main_content.appendChild(filmPageContainer);

            const filmPage = new FilmPage(filmPageContainer, this);
            filmPage.render();
        }
        else if (this.currentPage === 'playerPage') {
            const playerContainer = document.createElement('div');
            this.#main_content.appendChild(playerContainer);

            const player = new Player(playerContainer, this);
            player.render();
        }
        else if (this.currentPage === 'starPage') {
            const starPageContainer = document.createElement('div');
            this.#main_content.appendChild(starPageContainer);

            const starPage = new StarPage(starPageContainer, this);
            starPage.render();
        }

        this.header.render();

        window.scrollTo({ top: 0, behavior: "instant" });

        return this.#container;
    }
    /**
     * Sets the current page and re-renders the application.
     * @param {string} page - Page to set ('home', 'login', 'signup').
     * @returns {void}
     */
    setPage(page) {
        this.currentPage = page;
        this.render();
    }
    /**
     * Logs in the user, updates authorization state, and set home page.
     * @returns {void}
     */
    loginUser() {
        this.isAuthorized = true;
        this.setPage('home');
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
            this.setPage('home');
        }
        return { success, error };
    }
}

export default App;
