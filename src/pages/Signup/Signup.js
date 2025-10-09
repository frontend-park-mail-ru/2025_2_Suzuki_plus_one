import { validateEmail, validatePassword, validateUsername } from '@shared/utils/validation';
import template from './Signup.hbs';
import { submitSignupForm } from '@shared/api/signupApi.js';
import { setupPasswordToggle } from '@shared/ui/passwordToggle';

class Signup {
  #parent;
  #appInstance;

  constructor(parent, appInstance) {
    this.#parent = parent;
    this.#appInstance = appInstance;
  }

  render() {
    this.#parent.innerHTML = template({});

    const form = this.#parent.querySelector('#signup-form');
    this.#setupFormSubmission(form);
    setupPasswordToggle(this.#parent);
  }

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