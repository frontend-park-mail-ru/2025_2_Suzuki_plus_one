import {
    validateEmail,
    validatePassword,
    validateUsername,
} from '@shared/utils/validation';

import './styles/signup.scss';
import template from './ui/Signup.hbs';
import { submitSignupForm } from '@shared/api/signupApi.js';
import { setupPasswordToggle } from '@shared/ui/passwordToggle';

/**
 * @class Signup
 * @description Manages the signup page, coordinating rendering, form submission, and password visibility toggle.
 */
class Signup {
    #parent;
    #appInstance;

    /**
     * @constructor
     * @param {HTMLElement} parent - The parent DOM element to render the signup form into
     * @param {Object} appInstance - The main application instance for managing state and navigation
     */
    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#appInstance = appInstance;
    }

    /**
     * @method render
     * @description Renders the signup form, sets up form submission, and initializes password toggle.
     */
    render() {
        this.#parent.innerHTML = template({});

        const form = this.#parent.querySelector('#signup-form');
        this.#setupFormSubmission(form);
        setupPasswordToggle(this.#parent);
    }

    /**
     * @method #setupFormSubmission
     * @private
     * @description Sets up the form submission event listener with validation.
     * @param {HTMLFormElement} form - The signup form element
     */
    #setupFormSubmission(form) {
        const errorDivs = {
            username: this.#parent.querySelector('#usernameError'),
            email: this.#parent.querySelector('#emailError'),
            password: this.#parent.querySelector('#passwordError'),
            confirm: this.#parent.querySelector('#confirmError'),
        };

        const setError = (field, message) => {
            const errorEl = this.#parent.querySelector(`#${field}Error`);
                if (errorEl) {
                    errorEl.textContent = message || '';
                    errorEl.style.display = message ? 'block' : 'none';
                }
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fields = {
                username: form.querySelector('input[name="username"]').value,
                email: form.querySelector('input[name="email"]').value,
                password: form.querySelector('input[name="password"]').value,
            };

            const validations = {
                username: validateUsername(fields.username),
                email: validateEmail(fields.email),
                password: validatePassword(fields.password),
                confirm:
                    fields.password !==
                    form.querySelector('input[name="confirm_password"]').value
                        ? 'Passwords do not match'
                        : null,
            };

            Object.keys(errorDivs).forEach((field) => setError(field, ''));
            Object.entries(validations).forEach(([field, error]) =>
                setError(field, error)
            );
            if (Object.values(validations).some(Boolean)) return;

            try {
                await submitSignupForm(fields, this.#appInstance);
                await this.#appInstance.checkAuthOnLoad();
            } catch (err) {
                setError('confirm', err.message || 'Unexpected error');
            }
        });
    }
}

export default Signup;
