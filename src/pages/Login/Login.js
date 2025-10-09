import template from './Login.hbs';
import { submitLoginForm } from '@shared/api/loginApi.js';
import { setupPasswordToggle } from '@shared/ui/passwordToggle';

class Login {
  #parent;
  #appInstance;

  constructor(parent, appInstance) {
    this.#parent = parent;
    this.#appInstance = appInstance;
  }

  render() {
    this.#parent.innerHTML = template({});

    this.#setupFormListener();
    setupPasswordToggle(this.#parent);
  }

  #setupFormListener() {
    const form = this.#parent.querySelector('#login-form');
    const passwordErrorDiv = this.#parent.querySelector('#passwordError');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('#password').value;

        await submitLoginForm(email, password, this.#appInstance, passwordErrorDiv);
      });
    }
  }
}

export default Login;