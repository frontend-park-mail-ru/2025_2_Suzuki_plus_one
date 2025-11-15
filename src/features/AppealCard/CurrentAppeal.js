import './styles/currentAppeal.scss';
import template from './ui/CurrentAppeal.hbs';
import {
    AddMessageToAppeal,
    markAppealAsResolved,
    fetchAppealById,
    getMessageOfAppeal
} from '@shared/api/appealApi.js';

class CurrentAppeal {
    #parent;
    #appealId;
    #appInstance;

    constructor(parent, appealId, appInstance = null) {
        this.#parent = parent;
        this.#appealId = params.id;
        this.#appInstance = appInstance;
    }

    async render() {
        try {
            const appealInfo = await fetchAppealById(this.#appealId);

            const messagesData = await getMessageOfAppeal(this.#appealId);

            const formattedMessages = messagesData.messages.map(msg => ({
                sender: msg.is_response ? "support" : "user",
                message: msg.message,
                timestamp: msg.timestamp,
                displayTime: this.#formatTime(msg.timestamp)
            }));

            const finalFormatted = {
                ...appealInfo,
                createdDate: this.#formatDate(appealInfo.created_at),
                displayStatus: this.#getDisplayStatus(appealInfo.status),
                messages: formattedMessages
            };

            this.#parent.innerHTML = template(finalFormatted);

            this.#setupReplyButton();
            this.#setupCloseButton();
        } catch (err) {
            console.error('Render error:', err);
            this.#parent.innerHTML = `
                <div class="support-chat__error">
                    Failed to load appeal: ${err.message}
                </div>
            `;
        }
    }

    #formatTime(timestamp) {
        if (!timestamp) return '';
        const [time] = timestamp.split(' ');
        return time;
    }

    #formatDate(timestamp) {
        if (!timestamp) return '';
        const [, date] = timestamp.split(' ');
        return date || '';
    }

    #getDisplayStatus(status) {
        if (status === 'open') return 'Open';
        if (status === 'in_progress') return 'In Progress';
        if (status === 'closed') return 'Closed';
        return status;
    }

    #setupReplyButton() {
        const replyBtn = this.#parent.querySelector('#reply-button');
        const replyContainer = this.#parent.querySelector('#reply-container');

        if (!replyBtn || !replyContainer) return;

        replyBtn.addEventListener('click', () => {
            replyContainer.hidden = false;
            const textarea = replyContainer.querySelector('textarea');
            textarea?.focus();
        });

        const sendBtn = replyContainer.querySelector('#send-reply');
        const textarea = replyContainer.querySelector('#reply-text');

        if (!sendBtn || !textarea) return;

        sendBtn.addEventListener('click', async () => {
            const message = textarea.value.trim();
            if (!message) return;

            try {
                await AddMessageToAppeal(this.#appealId, { message });

                textarea.value = '';
                replyContainer.hidden = true;

                this.#addUserMessage(message);
            } catch (err) {
                console.log(err.message || 'Unknown error');
            }
        });
    }

    #addUserMessage(message) {
        const messagesContainer = this.#parent.querySelector('#messages');
        if (!messagesContainer) return;

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const messageHTML = `
            <div class="support-chat__message support-chat__message--user">
                <div class="support-chat__bubble">${this.#escapeHTML(message)}</div>
                <div class="support-chat__time">${timeStr}</div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    #escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    #setupCloseButton() {
        const closeBtn = this.#parent.querySelector('#close-button');
        if (!closeBtn) return;

        closeBtn.addEventListener('click', async () => {
            try {
                await markAppealAsResolved(this.#appealId);
            } catch (err) {
                console.log(err.message || 'Unknown error');
            }
        });
    }
}

export default CurrentAppeal;
