import './styles/currentAppeal.scss';
import template from './ui/CurrentAppeal.hbs';
// import { fetchAppeal, sendReply } from '@shared/api/supportApi.js';


class CurrentAppeal {
    #parent;
    #appealId;
    #appInstance;

    constructor(parent, appealId, appInstance = null) {
        this.#parent = parent;
        this.#appealId = appealId;
        this.#appInstance = appInstance;
    }

    async render() {
        try {
            // const appeal = await fetchAppeal(this.#appealId);
            const appeal = {
            "tag": "bug",
            "name": "I have a problem...",
            "status": "open",
            "created_at": "11:11 01.01.2024",
            "messages": [
                {
                "sender": "user",
                "message": "Thank you for your feedback!",
                "timestamp": "11:15 01.01.2024"
                }
            ]
            }
            this.#parent.innerHTML = template({
                ...appeal,
                formatTime: this.#formatTime,
                formatDate: this.#formatDate
            });

            this.#setupReplyButton();
            this.#setupCloseButton();
        } catch (err) {
            this.#parent.innerHTML = `
                <div class="support-chat__error">
                    Failed to load appeal. Please check the link or try again later.
                </div>
            `;
        }
    }

    #formatTime(timestamp) {
        const [time, date] = timestamp.split(' ');
        return time; // Просто время
    }

    #formatDate(timestamp) {
        const [, date] = timestamp.split(' ');
        return date;
    }

    #setupReplyButton() {
        const replyBtn = this.#parent.querySelector('#reply-button');
        const replyContainer = this.#parent.querySelector('#reply-container');

        if (replyBtn && replyContainer) {
            replyBtn.addEventListener('click', () => {
                replyContainer.hidden = false;
                replyContainer.querySelector('textarea').focus();
            });

            const sendBtn = replyContainer.querySelector('#send-reply');
            const textarea = replyContainer.querySelector('#reply-text');

            sendBtn.addEventListener('click', async () => {
                const message = textarea.value.trim();
                if (!message) return;

                try {
                    await sendReply(this.#appealId, message);
                    textarea.value = '';
                    replyContainer.hidden = true;
                    this.render();
                } catch (err) {
                    alert('Failed to send reply: ' + (err.message || 'Unknown error'));
                }
            });
        }
    }

    #setupCloseButton() {
        const closeBtn = this.#parent.querySelector('#close-button');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                // Заглушка — можно расширить позже
                alert('Closing appeal is not implemented yet.');
            });
        }
    }
}

export default CurrentAppeal;
