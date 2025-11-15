import './styles/newAppeal.scss';
import template from './ui/NewAppeal.hbs';
import { createNewAppeal } from '@shared/api/appealApi.js';

class NewAppeal {
    #parent;
    #appInstance;

    constructor(parent, appInstance = null) {
        this.#parent = parent;
        this.#appInstance = appInstance;
    }

    render() {
        this.#parent.innerHTML = template({});

        this.#setupFormListener();
    }

    #setupFormListener() {
        const form = this.#parent.querySelector('#support-form');
        const errorDiv = this.#parent.querySelector('#supportError');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const tag = form.querySelector('#support-tag').value;
                const message = form.querySelector('#support-message').value.trim();

                errorDiv.textContent = '';
                errorDiv.hidden = true;

                if (!tag) {
                    this.#showError('Please select a topic.');
                    return;
                }
                if (!message) {
                    this.#showError('Please write a message.');
                    return;
                }

                const data = {
                    tag,
                    message
                };

                try {
                    const result = await createNewAppeal(data);
                    if (result?.success) {
                        this.#showSuccess();
                        form.reset();
                    }
                } catch (err) {
                    this.#showError(err.message || 'Failed to send message. Please try again.');
                }
            });
        }
    }

    #showError(message) {
        const errorDiv = this.#parent.querySelector('#supportError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.hidden = false;
        }
    }

    #showSuccess() {
        const errorDiv = this.#parent.querySelector('#supportError');
        if (errorDiv) {
            errorDiv.textContent = 'Thank you! Your message has been sent.';
            errorDiv.style.color = 'var(--color-green)';
            errorDiv.hidden = false;

            setTimeout(() => {
                errorDiv.hidden = true;
                errorDiv.style.color = '';
            }, 5000);
        }
    }
}

export default NewAppeal;
