import './styles/film-banner.scss';
import './styles/stars-section.scss';
import './styles/films-recommendations.scss';
import template from './ui/FilmPage.hbs';
import poster from '@assets/images/poster.png';
import star_photo from '@assets/images/star_photo.png';
import StarCard from '@features/StarCard/StarCard.js';
import FilmCard from '@features/FilmCard/FilmCard.js';
import preview from '@assets/images/film_card.png';
import { fetchFilm, fetchMedia } from '@shared/api/moviesApi.js'; 
import { fetchStarsByFilmId } from '@shared/api/moviesApi.js';
import { setMediaReaction, removeMediaReaction,checkMediaReaction } from '@shared/api/favouriteApi.js';
import { getUserInfo } from '@shared/api/userApi.js';
import thumbUpIcon from '@shared/assets/images/icons/thumb_up.svg';
import thumbDownIcon from '@shared/assets/images/icons/thumb_down.svg';

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
                total_likes: film.user_rating?.likes ?? 0,
                total_dislikes: film.user_rating?.dislikes ?? 0,
                thumb_up_icon: thumbUpIcon,
                thumb_down_icon: thumbDownIcon,
                
            });

            await this.#updateReactionState();

            this.renderStarCards();
            this.#setupReactionButtons();
            this.#setupPlayButton();
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
async #updateReactionState() {
    try {
        const response = await checkMediaReaction(this.#filmId);

        const likeBtn = this.#parent.querySelector('#btn-like');
        const dislikeBtn = this.#parent.querySelector('#btn-dislike');

        if (!likeBtn || !dislikeBtn) return;

        if (response.liked) {
            likeBtn.classList.add('active');
            dislikeBtn.classList.remove('active');
        } else if (response.is_dislike) {
            dislikeBtn.classList.add('active');
            likeBtn.classList.remove('active');
        } else {
            likeBtn.classList.remove('active');
            dislikeBtn.classList.remove('active');
        }
    } catch (err) {
        console.error('Failed to check reaction:', err);
    }
}

#setupReactionButtons() {
    const likeBtn = this.#parent.querySelector('#btn-like');
    const dislikeBtn = this.#parent.querySelector('#btn-dislike');

    const likeCountEl = this.#parent.querySelectorAll('.film-banner__reaction-count')[0];
    const dislikeCountEl = this.#parent.querySelectorAll('.film-banner__reaction-count')[1];

    if (!likeBtn || !dislikeBtn) return;

    const mediaId = this.#filmId;

    const handleClick = async (targetType) => {
        if (!this.#app.isAuthorized) {
            this.#showToast('Log in to rate', 'auth');
            return;
        }

        try {
            const current = await checkMediaReaction(mediaId);
            const isCurrentlyLike = current.liked;
            const isCurrentlyDislike = current.is_dislike;

            if (targetType === 'like') {
                if (isCurrentlyLike) {
                    await removeMediaReaction(mediaId);
                    this.#showToast('Removed from liked', 'success');
                } else {
                    await setMediaReaction(mediaId, 'like');
                    this.#showToast('Liked!', 'success');
                }
            } else if (targetType === 'dislike') {
                if (isCurrentlyDislike) {
                    await removeMediaReaction(mediaId);
                    this.#showToast('Removed from disliked', 'success');
                } else {
                    await setMediaReaction(mediaId, 'dislike');
                    this.#showToast('Disliked', 'success');
                }
            }

            await this.#updateReactionState();

            if (likeCountEl && dislikeCountEl) {
                try {
                    const film = await fetchFilm(mediaId);
                    const likes = film.user_rating?.likes ?? 0;
                    const dislikes = film.user_rating?.dislikes ?? 0;

                    likeCountEl.textContent = likes;
                    dislikeCountEl.textContent = dislikes;
                } catch (fetchErr) {
                    console.error('Failed to refresh like/dislike counters:', fetchErr);
                }
            }

        } catch (err) {
            console.error('Reaction failed:', err);
            this.#showToast('Something went wrong', 'error');
        }
    };

    likeBtn.addEventListener('click', () => handleClick('like'));
    dislikeBtn.addEventListener('click', () => handleClick('dislike'));
}

    #setupPlayButton() {
        const playButton = this.#parent.querySelector('.film-banner__button-play');
        if (!playButton) return;

        playButton.addEventListener('click', async (e) => {
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

                history.pushState({}, '', `/player/${this.#filmId}`);
            } catch (err) {
                console.error('Failed to play film:', err);
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
            toast.addEventListener('transitionend', () => toast.remove(), {
                once: true,
            });
        }, 2700);
    }
}

export default FilmPage;
