import './styles/player.scss';
import template from './ui/Player.hbs';
import { initPlayerControls } from './js/player-controls.js';
import poster from '@assets/images/MediaPlaceHolder.png';
import { fetchTrailer } from '@shared/api/trailerApi.js';
import { fetchMedia } from '@shared/api/moviesApi.js';
import RewindLeft from '@shared/assets/images/icons/circular-arrow-left.svg?raw';
import RewindRight from '@shared/assets/images/icons/circular-arrow-right.svg?raw';
import { fetchEpisodesBySeriesId } from '@shared/api/seriesApi.js';
import EpisodePrevIcon from '@shared/assets/images/icons/prev.svg?raw';
import EpisodeNextIcon from '@shared/assets/images/icons/next.svg?raw';

class Player {
    #parent;
    #app;
    #filmId;           
    #seriesId;         
    #episodesList = []; 
    #currentEpisodeIndex = -1;

    constructor(parent, appInstance, params = {}) {
        console.log('Player params:', params);
        this.#parent = parent;
        this.#app = appInstance;
        this.type = params.type;
        this.#filmId = params.id;
        this.#seriesId = params.series_id || null;
    }

    async render() {
        let videoUrl = null;
        let posterUrl = poster;
        let isSeriesEpisode = false;

        if (this.type === 'trailer') {
            const trailerData = await fetchTrailer(this.#filmId);
            videoUrl = trailerData.trailers?.[0] || null;
            if (!videoUrl) {
                this.#parent.innerHTML = '<p style="text-align:center; color:red;">Trailer is not available</p>';
                return;
            }
        } else {
            const currentMedia = await fetchMedia(this.#filmId);
            videoUrl = currentMedia.url || null;
            posterUrl = currentMedia.posters?.[0] || poster;

            if (!videoUrl) {
                this.#parent.innerHTML = '<p style="text-align:center; color:red;">Media is not available</p>';
                return;
            }

            if (this.#seriesId) {
                isSeriesEpisode = true;
                await this.#loadEpisodesAndFindCurrent(currentMedia);
            }
        }

        this.#parent.innerHTML = template({
            video: videoUrl,
            poster: posterUrl,
            rewindLeftIcon: RewindLeft,
            rewindRightIcon: RewindRight,
            episodePrevIcon: EpisodePrevIcon,
            episodeNextIcon: EpisodeNextIcon,
            showNavButtons: isSeriesEpisode,
            hasPrev: this.#currentEpisodeIndex > 0,
            hasNext: this.#currentEpisodeIndex < this.#episodesList.length - 1 && this.#episodesList.length > 0,
        });

        requestAnimationFrame(() => {
            initPlayerControls();
            this.#setupEpisodeNavigation();
            this.#setupBackButton();
        });
    }

    async #loadEpisodesAndFindCurrent(currentMedia) {
        try {
            const response = await fetchEpisodesBySeriesId(this.#seriesId);
            this.#episodesList = response.episodes || [];

            this.#currentEpisodeIndex = this.#episodesList.findIndex(
                ep => ep.media.media_id === this.#filmId
            );

            if (this.#currentEpisodeIndex === -1) {
                console.warn('Current episode not found in episodes list');
                this.#currentEpisodeIndex = 0;
            }
        } catch (error) {
            console.error('Failed to load episodes:', error);
            this.#episodesList = [];
            this.#currentEpisodeIndex = -1;
        }
    }

    #setupEpisodeNavigation() {
        const prevBtn = this.#parent.querySelector('#episode-prev');
        const nextBtn = this.#parent.querySelector('#episode-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.#goToEpisode(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.#goToEpisode(1));
        }
    }

    async #goToEpisode(direction) {
        const newIndex = this.#currentEpisodeIndex + direction;

        if (newIndex < 0 || newIndex >= this.#episodesList.length) {
            return;
        }

        const targetEpisode = this.#episodesList[newIndex];
        const targetMediaId = targetEpisode.media.media_id;

        try {
            const mediaData = await fetchMedia(targetMediaId);

            const videoUrl = mediaData.url || null;
            const newPosterUrl = mediaData.posters?.[0] || poster;

            if (!videoUrl) {
                alert('Видео для этой серии недоступно');
                return;
            }

            this.#filmId = targetMediaId;
            this.#currentEpisodeIndex = newIndex;

            const videoEl = this.#parent.querySelector('#video-player');
            if (videoEl) {
                videoEl.src = videoUrl;
                videoEl.poster = newPosterUrl;
                videoEl.load();
            }

            const prevBtn = this.#parent.querySelector('#episode-prev');
            const nextBtn = this.#parent.querySelector('#episode-next');

            if (prevBtn) prevBtn.style.display = newIndex > 0 ? 'block' : 'none';
            if (nextBtn) nextBtn.style.display = newIndex < this.#episodesList.length - 1 ? 'block' : 'none';

            requestAnimationFrame(() => {
                initPlayerControls();
            });

        } catch (error) {
            console.error('Failed to load next episode media:', error);
            alert('Не удалось загрузить следующую серию');
        }
    }

    #setupBackButton() {
        const backBtn = this.#parent.querySelector('#video-hud__back');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                history.back();
            });
        }
    }
}

export default Player;
