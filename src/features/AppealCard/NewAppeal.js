import './styles/newAppeal.scss';
import template from './ui/NewAppeal.hbs';
// import { submitSupportForm } from '@shared/api/supportApi.js';


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
                // const fileInput = form.querySelector('#support-file');
                // const file = fileInput.files[0] || null;

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

                const formData = new FormData();
                formData.append('tag', tag);
                formData.append('message', message);
                // if (file) {
                //     formData.append('attachment', file);
                // }

                try {
                    const result = await submitSupportForm(formData);
                    if (result?.success) {
                        this.#showSuccess();
                        form.reset();
                        this.#updateFileLabel();
                    }
                } catch (err) {
                    this.#showError(err.message || 'Failed to send message. Please try again.');
                }
            });
        }
    }

    #showError(message) {
        const errorDiv = this.#parent.querySelector('#supportError');
        errorDiv.textContent = message;
        errorDiv.hidden = false;
    }

    #showSuccess() {
        const errorDiv = this.#parent.querySelector('#supportError');
        errorDiv.textContent = 'Thank you! Your message has been sent.';
        errorDiv.style.color = 'var(--color-green)'; 
        errorDiv.hidden = false;

        setTimeout(() => {
            errorDiv.hidden = true;
            errorDiv.style.color = '';
        }, 5000);
    }

    #updateFileLabel() {
        const label = this.#parent.querySelector('.support__file-label');
        if (label) label.textContent = 'Attach file (optional)';
    }
}

export default NewAppeal
