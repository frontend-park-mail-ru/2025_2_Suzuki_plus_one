import FilmCard from '@features/FilmCard/FilmCard.js';
import template from './ui/SeriesTab.hbs';
import { fetchSeries } from '@shared/api/seriesApi';
import { createNewPayment } from '@shared/api/paymentApi.js';
import { getUserInfo } from '@shared/api/userApi.js';

class SeriesTab {
    #parent;
    #app;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
    }
    render() {
        this.#parent.innerHTML = template({});
        this.renderSeries();
        this.setupSubscribeButton();
        this.setupPlayButton();
    }

    setupPlayButton() {
        const playButton = this.#parent.querySelector('.hero__button.button');
        const filmsContainer = this.#parent.querySelector('#seriesContainer');

        if (playButton && filmsContainer) {
            playButton.addEventListener('click', () => {
                filmsContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        }
    }


    async setupSubscribeButton() {
        const subscribeButton = this.#parent.querySelector('.hero__subscribe');
        if (!subscribeButton) return;

        if (this.#app.isAuthorized) {
            try {
                const userInfo = await getUserInfo();
                if (userInfo.subscription_status === 'active') {
                    subscribeButton.textContent = 'Subscribed';
                    subscribeButton.disabled = true;
                    subscribeButton.classList.add('subscribed');
                    return;
                }
            } catch (error) {
                console.error('Failed to check subscription:', error);
                this.#showToast('Failed to check subscription status', 'error');
            }
        }

        subscribeButton.addEventListener('click', async () => {
            if (!this.#app.isAuthorized) {
                this.#showToast('Log in to subscribe', 'auth');
                return;
            }

            subscribeButton.disabled = true;
            subscribeButton.textContent = 'Redirecting...';

            try {
                await createNewPayment();
            } catch (error) {
                console.error('Payment failed:', error);
                this.#showToast('Failed to start subscription. Try again later.', 'error');
                subscribeButton.disabled = false;
                subscribeButton.textContent = 'Get subscription';
            }
        });
    }


    async renderSeries() {
        const seriesContainer = this.#parent.querySelector('#seriesContainer');
        try {
            const response = await fetchSeries();
            const seriesData = response.movies.map((series) => ({
                id: series.media_id,
                title: series.title,
                genres: series.genres
                    ? series.genres
                          .map((g) => g.name)
                          .join(', ')
                          .toLowerCase()
                    : '',
                release_date: series.release_date.substr(0, 4),
                poster: series.posters ? series.posters[0] : poster,
                seasons: series.seasons,
                type: 'series',
            }));

            seriesData.forEach((series) => {
                const seriesElement = document.createElement('div');
                seriesContainer.appendChild(seriesElement);
                const seriesCard = new FilmCard(seriesElement, this.#app);
                seriesCard.render(series);
            });
        } catch (err) {
            seriesContainer.innerHTML = `
                <p>Failed to load appeals: ${err.message || 'Unknown error'}<\p>
            `;
        }
    }

    #showToast(message, type = 'auth') {
        const existingToast = document.querySelector('.action-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `action-toast action-toast--${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        toast.offsetHeight;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, 3500);
    }
}

export default SeriesTab;
