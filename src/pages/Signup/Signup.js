import { validateEmail, validatePassword, validateUsername } from '@shared/utils/validation';
import template from './Signup.hbs';
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
    const usernameErrorDiv = this.#parent.querySelector('#usernameError');
    const emailErrorDiv = this.#parent.querySelector('#emailError');
    const passwordErrorDiv = this.#parent.querySelector('#passwordError');
    const confirmErrorDiv = this.#parent.querySelector('#confirmError');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = form.querySelector('input[name="username"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const password = form.querySelector('#password').value;
      const confirmPassword = form.querySelector('#confirm-password').value;

      const usernameError = validateUsername(username);
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      const confirmError = password !== confirmPassword ? 'Passwords do not match' : null;

      usernameErrorDiv.textContent = usernameError || '';
      emailErrorDiv.textContent = emailError || '';
      passwordErrorDiv.textContent = passwordError || '';
      confirmErrorDiv.textContent = confirmError || '';

      if (usernameError || emailError || passwordError || confirmError) {
        return;
      }

      await submitSignupForm({ username, email, password }, this.#appInstance, {
        confirmErrorDiv,
      });
    });
  }
}

export default Signup;