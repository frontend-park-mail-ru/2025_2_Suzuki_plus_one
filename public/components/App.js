import Header from './Header/Header.js'
import Footer from './Footer/Footer.js'
import Home from './Home/Home.js'
import Login from './Login/Login.js'
import Signup from './Signup/Signup.js'
import { checkAuth } from '../js/utils/auth.js'
/** Class representing the main application.
 * Handles page rendering, user authentication state, and header/footer setup.
 */
class App {
    /** @type {HTMLElement} The root container of the application */
    #container
    /** @type {HTMLElement} The container for the main page content */
    #main_content
    /**
     * Creates an instance of the App.
     * Initializes the main container, main content, and user authorization state.
     */
    constructor() {
        /** @type {string} Current page ('home', 'login', 'signup') */
        this.currentPage = 'home'
        this.#container = document.createElement('div')
        this.#container.className = 'app-container'
        this.#main_content = document.createElement('div')
        this.#main_content.className = 'main-content'
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
        const headerContainer = document.createElement('div')
        this.#container.appendChild(headerContainer)

        this.header = new Header(headerContainer, this)
        this.header.render()

        this.#container.appendChild(this.#main_content)

        const footerContainer = document.createElement('div')
        this.#container.appendChild(footerContainer)

        const footer = new Footer(footerContainer)
        footer.render()
    }
    /**
     * Renders the current page inside the main content container.
     * Creates and renders the components for 'home', 'login', or 'signup'.
     * @returns {HTMLElement} The root container element of the application.
     */
    render() {
        this.#main_content.innerHTML = ''

        if (this.currentPage === 'home') {
            const homeContainer = document.createElement('div')
            this.#main_content.appendChild(homeContainer)
            const home = new Home(homeContainer)
            home.render()
        } else if (this.currentPage === 'login') {
            const loginContainer = document.createElement('div')
            this.#main_content.appendChild(loginContainer)

            const login = new Login(loginContainer, this)
            login.render()
        } else if (this.currentPage === 'signup') {
            const signupContainer = document.createElement('div')
            this.#main_content.appendChild(signupContainer)

            const signup = new Signup(signupContainer, this)
            signup.render()
        }

        this.header.render()

        return this.#container
    }
    /**
     * Sets the current page and re-renders the application.
     * @param {string} page - Page to set ('home', 'login', 'signup').
     * @returns {void}
     */
    setPage(page) {
        this.currentPage = page
        this.render()
    }
    /**
     * Logs in the user, updates authorization state, and set home page.
     * @returns {void}
     */
    loginUser() {
        this.isAuthorized = true
        this.setPage('home')
    }
    /**
     * Logs out the user, clears authorization state, removes token, and navigates to home.
     * @returns {void}
     */
    logoutUser() {
        this.isAuthorized = false
        localStorage.removeItem('token')
        this.setPage('home')
    }
}

export default App
