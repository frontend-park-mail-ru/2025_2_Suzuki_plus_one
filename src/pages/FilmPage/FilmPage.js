import './styles/film-banner.scss';
import './styles/stars-section.scss';
import './styles/films-recommendations.scss';
import template from './ui/FilmPage.hbs';
import poster from '@assets/images/poster.png';
import star_photo from '@assets/images/star_photo.png';
import StarCard from '@features/StarCard/StarCard.js';
import FilmCard from '@features/FilmCard/FilmCard.js';
import preview from '@assets/images/film_card.png';
import { fetchFilm } from '@shared/api/moviesApi.js';
import { fetchStarsByFilmId } from '@shared/api/moviesApi.js';
import {
    addToFavourite,
    checkMediaIsLiked,
    deleteFromFavourite,
} from '@shared/api/favouriteApi.js';

class FilmPage {
    #parent;
    #app;
    #filmId;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.params = params;
        this.#filmId = params.id;
    }

    async render() {
        try {
            const film = await fetchFilm(this.#filmId);
            const genres = film.genres
                ? film.genres
                      .map((g) => g.name)
                      .join(', ')
                      .toLowerCase()
                : '';
            const year = film.release_date ? film.release_date.split('-')[0] : '';
            const duration = this.#formatDuration(film.duration_minutes);
            const poster = film.posters && film.posters.length > 0 ? film.posters[0] : '';

            this.#parent.innerHTML = template({
                id: film.media_id,
                poster: poster,
                title: film.title || 'Unknown',
                description: film.description || '',
                genres: genres,
                country: film.country || '',
                rating: film.rating ? film.rating.toFixed(1) : '—',
                release_date: year,
                duration: duration,
                age_rating: film.age_rating ? `${film.age_rating}+` : '—',
                plot_summary: film.plot_summary || film.description || '',
            });

            await this.#updateFavouriteState();

            this.renderStarCards();
            this.#setupFavouriteButton();
        } catch (err) {
            this.#parent.innerHTML =
                '<h2 style="text-align:center; color:red;">Film not found</h2>';
            console.error('Failed to load film:', err);
        }
    }

    #formatDuration(minutes) {
        if (!minutes) return '—';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m > 0 ? m + 'm' : ''}`.trim();
    }

    afterRender() {
        this.setupScrollButtons();
    }

    setupScrollButtons() {
        const list = this.#parent.querySelector('#recommendations-section');
        const leftBtn = this.#parent.querySelector('.films-recommendations__button--left');
        const rightBtn = this.#parent.querySelector('.films-recommendations__button--right');

        if (!list || !leftBtn || !rightBtn) return;

        const scrollAmount = 300;

        leftBtn.addEventListener('click', () => {
            list.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth',
            });
        });

        rightBtn.addEventListener('click', () => {
            list.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        });

        const updateButtons = () => {
            leftBtn.style.opacity = list.scrollLeft <= 0 ? '0.5' : '1';
            rightBtn.style.opacity =
                list.scrollLeft >= list.scrollWidth - list.clientWidth - 10 ? '0.5' : '1';
        };

        list.addEventListener('scroll', updateButtons);
        updateButtons();
    }

    async renderStarCards() {
        const starsContainer = this.#parent.querySelector('#stars-section');

        const data = await fetchStarsByFilmId(this.params.id);
        const starData = data.actors;

        starsContainer.innerHTML = '';

        if (!starData || starData.length === 0) {
            starsContainer.innerHTML = '<p>Actors not found</p>';
            return;
        }

        starData.forEach((actor) => {
            const starElement = document.createElement('div');
            starsContainer.appendChild(starElement);

            const starCard = new StarCard(starElement, this.#app);

            const photo =
                actor.image_urls && actor.image_urls.length > 0 ? actor.image_urls[0] : star_photo;

            starCard.render({
                id: actor.id,
                star_name: actor.name,
                role_name: '',
                star_photo: photo,
            });
        });
    }

    async #updateFavouriteState() {
        try {
            const { liked } = await checkMediaIsLiked(this.#filmId);
            const btn = this.#parent.querySelector('#btn_to_favourite');
            if (btn) {
                if (liked) {
                    btn.classList.add('liked');
                } else {
                    btn.classList.remove('liked');
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    #setupFavouriteButton() {
        const favouriteBtn = this.#parent.querySelector('#btn_to_favourite');
        if (!favouriteBtn) return;

        favouriteBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            if (!this.#app.isAuthorized) {
                this.#showToast('Log in to add to favourites', 'auth');
                return;
            }

            const isLiked = favouriteBtn.classList.contains('liked');

            try {
                if (isLiked) {
                    await deleteFromFavourite(this.#filmId);
                    favouriteBtn.classList.remove('liked');
                    this.#showToast('Removed from favourites successfully', 'success');
                } else {
                    await addToFavourite(this.#filmId);
                    favouriteBtn.classList.add('liked');
                    this.#showToast('Added to favourites successfully', 'success');
                }
            } catch (err) {
                console.error('Favourite toggle failed:', err);
                this.#showToast('Something went wrong', 'error');
            }
        });
    }

    #setupPlayButton() {
        const playButton = this.#parent.querySelector('.film-banner__button-play');
        if (!playButton) return;

        playButton.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                const media = await fetchMedia(this.#filmId);
                const mediaUrl = media.url;

                this.#app.navigate(`/player/${this.#filmId}`, { mediaUrl });
            } catch (err) {
                console.error(err);
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
            toast.addEventListener('transitionend', () => toast.remove(), {
                once: true,
            });
        }, 2700);
    }
}

export default FilmPage;
