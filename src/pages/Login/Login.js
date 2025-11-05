import './styles/login.scss';
import template from './ui/Login.hbs';
import { submitLoginForm } from '@shared/api/loginApi.js';
import { setupPasswordToggle } from '@shared/ui/passwordToggle';

/**
 * @class Login
 * @description Handles the rendering and functionality of the login form
 */
class Login {
    #parent;
    #appInstance;

    /**
     * @constructor
     * @param {HTMLElement} parent - The parent DOM element to render the login form into
     * @param {Object} appInstance - The main application instance for managing state and navigation
     */
    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#appInstance = appInstance;
    }

    /**
     * @method render
     * @description Renders the login form and attaches event listeners
     */
    render() {
        this.#parent.innerHTML = template({});

        this.#setupFormListener();
        setupPasswordToggle(this.#parent);
    }

    /**
     * @method #setupFormListener
     * @description Sets up the form submission event listener
     * @private
     */
    #setupFormListener() {
        const form = this.#parent.querySelector('#login-form');
        const passwordErrorDiv = this.#parent.querySelector('#passwordError');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                const password = form.querySelector('#password').value;

                try {
                    const result = await submitLoginForm(email, password);
                    if (result?.access_token) {
                        this.#appInstance.loginUser(result.access_token);
                    }
                } catch (err) {
                    passwordErrorDiv.textContent =
                        err.message || 'Unexpected error';
                }
            });
        }
    }
}

export default Login;
