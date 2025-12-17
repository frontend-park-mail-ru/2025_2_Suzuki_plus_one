import './styles/episode-card.scss';
import template from './ui/EpisodeCard.hbs';
import { getUserInfo } from '@shared/api/userApi.js';

class EpisodeCard {
    #parent;
    #app;
    #episodeId;
    #seriesId;

    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
    }

    render(data) {
        this.#episodeId = data.episode_id;
        this.#seriesId = data.series_id;

        this.#parent.innerHTML = template(data);

        this.#setupClickHandler();
    }

    #setupClickHandler() {
        const card = this.#parent.querySelector('.episode-card');
        if (!card) return;

        card.style.cursor = 'pointer';

        card.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!this.#app.isAuthorized) {
                this.#showToast('Log in to watch', 'auth');
                return;
            }

            try {
                const userInfo = await getUserInfo();
                if (userInfo.subscription_status !== 'active') {
                    this.#showToast('Please subscribe to watch content', 'error');
                    return;
                }
                this.#app.router.navigate(`/player/media/${this.#episodeId}?series=${this.#seriesId}`);
            } catch (err) {
                console.error('Failed to check subscription for episode:', err);
                this.#showToast('Something went wrong', 'error');
            }
        });
    }

    #showToast(message, type = 'info') {
        const existing = document.querySelector('.action-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `action-toast action-toast--${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, 2700);
    }
}

export default EpisodeCard;
