import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import Home from './Home/Home.js';
import Login from './Login/Login.js';
import Signup from './Signup/Signup.js';

class App {
    #container
    #main_content
    constructor() {
        this.currentPage = 'home';
        this.#container = document.createElement('div');
        this.#container.className = 'app-container';
        this.#main_content = document.createElement('div');
        this.#main_content.className = 'main-content';

        this.isAuthorized = !!localStorage.getItem('token');

        this.setUp();
    }

    setUp() {
        const headerContainer = document.createElement("div");
        this.#container.appendChild(headerContainer);

        this.header = new Header(headerContainer, this);
        this.header.render();

        this.#container.appendChild(this.#main_content);

        const footerContainer = document.createElement("div");
        this.#container.appendChild(footerContainer)

        const footer = new Footer(footerContainer);
        footer.render();
    }

    render() {
        this.#main_content.innerHTML = '';

        if (this.currentPage === 'home') {
            const homeContainer = document.createElement("div");
            this.#main_content.appendChild(homeContainer);
            const home = new Home(homeContainer);
            home.render();

        } else if (this.currentPage === 'login') {
            const loginContainer = document.createElement("div");
            this.#main_content.appendChild(loginContainer);

            const login = new Login(loginContainer, this);
            login.render();

        } else if (this.currentPage === 'signup') {
            const signupContainer = document.createElement("div");
            this.#main_content.appendChild(signupContainer);

            const signup = new Signup(signupContainer, this);
            signup.render();
        }

        this.header.render();

        return this.#container;
    }

    setPage(page) {
        this.currentPage = page;
        this.render();
    }

    loginUser() {
        this.isAuthorized = true;
        this.setPage("home");
    }

    logoutUser() {
        this.isAuthorized = false;
        localStorage.removeItem('token');
        this.setPage("home");
    }
}

export default App;