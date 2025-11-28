import './styles/film-banner.scss';
import './styles/stars-section.scss';
import './styles/episode-card.scss';
import './styles/films-recommendations.scss';
import template from './ui/SeriesPage.hbs';
import star_photo from '@assets/images/star_photo.png';
import StarCard from '@features/StarCard/StarCard.js';
import EpisodeCard from '@features/EpisodeCard/EpisodeCard';
import { fetchSeriesById, fetchEpisodesBySeriesId } from '@shared/api/seriesApi.js';
import { fetchStarsByFilmId } from '@shared/api/moviesApi.js';
import {addToFavourite, checkMediaIsLiked, deleteFromFavourite} from '@shared/api/favouriteApi.js';
import seriesPoster from '@assets/images/StrangerThings.png'

class SeriesPage {
    #parent;
    #app;
    #seriesId;
    #currentSeason;
    #allSeasons;
    #episodesData;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.params = params;
        this.#seriesId = params.id;
        this.#currentSeason = 1;
        this.#allSeasons = 1;
        this.#episodesData;
    }

    async render() {
        try {
            const film = await fetchSeriesById(this.#seriesId);
            const genres = film.genres ? film.genres.map(g => g.name).join(', ').toLowerCase() : '';
            const year = film.release_date ? film.release_date.split('-')[0] : '';
            const duration = this.#formatDuration(film.duration_minutes);
            const poster = film.posters && film.posters.length > 0 ? film.posters[0] : seriesPoster;

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

            await this.getEpisodesData();
            this.renderSeasons();
            this.renderEpisodesBySeason();
            this.setupSeasonSwitcher();

        } catch (err) {
            this.#parent.innerHTML = '<h2 style="text-align:center; color:red;">Film not found</h2>';
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
        const leftBtn = this.#parent.querySelector(
            '.films-recommendations__button--left'
        );
        const rightBtn = this.#parent.querySelector(
            '.films-recommendations__button--right'
        );

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
                list.scrollLeft >= list.scrollWidth - list.clientWidth - 10
                    ? '0.5'
                    : '1';
        };

        list.addEventListener('scroll', updateButtons);
        updateButtons();
    }

    renderSeasons() {
        const container = this.#parent.querySelector('.series__seasons');
        if (!container) return;
    
        container.innerHTML = `<h3 class="series__seasons-title">Seasons</h3>`;
    
        for (let i = 1; i <= this.#allSeasons; i++) {
            const btn = document.createElement('a');
            btn.className = `series__seasons-item${i === this.#currentSeason ? ' series__seasons-item--active' : ''}`;
            btn.textContent = i;
            container.appendChild(btn);
        }
    }

    setupSeasonSwitcher() {
        const buttons = this.#parent.querySelectorAll('.series__seasons-item, .series__seasons-item--active');
        if (!buttons || buttons.length === 0) return;
    
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const seasonNumber = Number(btn.textContent.trim());
                if (!seasonNumber || seasonNumber === this.#currentSeason) return;
    
                this.#currentSeason = seasonNumber;

                buttons.forEach(b => b.classList.remove('series__seasons-item--active'));
                btn.classList.add('series__seasons-item--active');

                this.renderEpisodesBySeason();
            });
        });
    }

    async getEpisodesData() {
        const data = await fetchEpisodesBySeriesId(this.#seriesId);
        this.#episodesData = data.episodes || [];

        this.#allSeasons = this.#episodesData.length
        ? Math.max(...this.#episodesData.map(ep => ep.season_number))
        : 0;
    }

    async renderEpisodesBySeason() {
        const episodesContainer = this.#parent.querySelector('#episodesContainer');
    
        episodesContainer.innerHTML = '';

        if (!this.#episodesData || this.#episodesData.length === 0) {
            episodesContainer.innerHTML = '<p>Episodes not found</p>';
            return;
        }

        this.#episodesData.forEach((episode) => {
            if (this.#currentSeason == episode.season_number) {

            const episodeElement = document.createElement('div');
            episodesContainer.appendChild(episodeElement);

            const episodeCard = new EpisodeCard(episodeElement, this.#app);

            const poster =
                episode.media.posters && episode.media.posters.length > 0
                    ? episode.media.posters[0]
                    : seriesPoster;

            
                episodeCard.render({
                    episode_id: episode.media.media_id,
                    episode_number: episode.episode_number,
                    season_number: episode.season_number,
                    title: episode.media.title,
                    release_date: episode.release_date,
                    poster: poster,
                    description: episode.media.description,
                });
            }
        });
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
                actor.image_urls && actor.image_urls.length > 0
                    ? actor.image_urls[0]
                    : star_photo;

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
            const { liked } = await checkMediaIsLiked(this.#seriesId);
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
                this.#showAuthToast();
                return;
            }
            
            const isLiked = favouriteBtn.classList.contains('liked');

            try {
                if (isLiked) {
                    await deleteFromFavourite(this.#seriesId);
                    favouriteBtn.classList.remove('liked');
                } else {
                    await addToFavourite(this.#seriesId);
                    favouriteBtn.classList.add('liked');
                }
            } catch (err) {
                console.error(err);
            }
        });

    }

    #setupPlayButton() {
        const playButton = this.#parent.querySelector('.film-banner__button-play');
        if (!playButton) return;

        playButton.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                const media = await fetchMedia(this.#seriesId);
                const mediaUrl = media.url;

                this.#app.navigate(`/player/${this.#seriesId}`, { mediaUrl });

            } catch (err) {
                console.error(err);
            }
        });
    }

    #showAuthToast() {
        const existingToast = document.querySelector('.auth-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'auth-toast';
        toast.textContent = 'Log in to add to favourites';
        document.body.appendChild(toast);

        toast.offsetHeight;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, 3000);
    }
}

export default SeriesPage;
