import './styles/player.scss';
import template from './ui/Player.hbs';
import { initPlayerControls } from './js/player-controls.js';
import poster from '@assets/images/StrangerThings.png';
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
    #episodesList = [];
    #currentEpisodeIndex = -1;
    #isSeriesEpisode = false;
    #seriesIdFromUrl = null;

    constructor(parent, appInstance, params = {}) {
        console.log('Player params:', params);
        this.#parent = parent;
        this.#app = appInstance;
        this.type = params.type;
        this.#filmId = params.id;

        const urlParams = new URLSearchParams(window.location.search);
        this.#seriesIdFromUrl = urlParams.get('series');
    }

    async render() {
        // todo потом вставить что-то такое когда ручки готовы будут
        // const film = await this.fetchFilm(this.#filmId);
        // this.#parent.innerHTML = template({
        //     video: film.videoUrl,
        //     poster: film.poster,
        // });
        var film, videoUrl;

        if (this.type === 'trailer') {
            film = await fetchTrailer(this.#filmId);
            videoUrl = film.trailers && film.trailers.length > 0 ? film.trailers[0] : null;
            if (!videoUrl) {
                this.#parent.innerHTML =
                    '<p style="text-align:center; color:red;">Trailer is not available</p>';
                return;
            }
        } else { //todo todo 
            try {
                
            [filmInfo, { url: videoUrl }] = await Promise.all([
                fetchFilm(this.#filmId),
                fetchMedia(this.#filmId).then(res => ({ url: res.url })).catch(() => ({ url: null }))
            ]);

            if (!videoUrl) {
                this.#parent.innerHTML = '<p style="text-align:center; color:red;">Media is not available</p>';
                return;
            }

            this.#isSeriesEpisode = filmInfo.media_type === 'episode';

            if (this.#isSeriesEpisode && this.#seriesIdFromUrl) {
                try {
                    const episodesResponse = await fetchEpisodesBySeriesId(this.#seriesIdFromUrl);
                    this.#episodesList = episodesResponse.episodes || [];

                    this.#episodesList.sort((a, b) => {
                        if (a.season_number !== b.season_number) return a.season_number - b.season_number;
                        return a.episode_number - b.episode_number;
                    });

                    this.#currentEpisodeIndex = this.#episodesList.findIndex(
                        ep => ep.media?.media_id === this.#filmId
                    );
                } catch (err) {
                    console.warn('Failed to load episodes list:', err);
                    this.#isSeriesEpisode = false;
                }
            }
        } catch (err) {
            console.error('Error loading media:', err);
            this.#parent.innerHTML = '<p style="text-align:center; color:red;">Media is not available</p>';
            return;
        }
    }

        const posterUrl = filmInfo.posters?.[0] || poster;

        this.#parent.innerHTML = template({
                video: videoUrl,
                poster: posterUrl,
                rewindLeftIcon: RewindLeft,
                rewindRightIcon: RewindRight,
                episodePrevIcon: EpisodePrevIcon,
                episodeNextIcon: EpisodeNextIcon,
                showEpisodeNav: this.#isSeriesEpisode,
                hasPrevEpisode: this.#isSeriesEpisode && this.#currentEpisodeIndex > 0,
                hasNextEpisode: this.#isSeriesEpisode && this.#currentEpisodeIndex < this.#episodesList.length - 1 && this.#currentEpisodeIndex !== -1,
        });

        // this.#parent.innerHTML = template({
        //      video,
        //     poster,
        //     rewindLeftIcon: RewindLeft,
        //     rewindRightIcon: RewindRight,
        //     });

        requestAnimationFrame(() => {
            initPlayerControls();
            this.#setupNavigationButtons();
        });
    }

    #setupNavigationButtons() {
        if (!this.#isSeriesEpisode) return;

        const prevEpisodeBtn = this.#parent.querySelector('#episode-prev');
        const nextEpisodeBtn = this.#parent.querySelector('#episode-next');

        if (prevEpisodeBtn) {
            prevEpisodeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.#currentEpisodeIndex > 0) {
                    const prevId = this.#episodesList[this.#currentEpisodeIndex - 1].media.media_id;
                    if (this.#app.router) {
                        this.#app.router.navigate(`/player/media/${prevId}`);
                    } else {
                        history.pushState({}, '', `/player/media/${prevId}`);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                }
            });
        }

        if (nextEpisodeBtn) {
            nextEpisodeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (
                    this.#currentEpisodeIndex < this.#episodesList.length - 1 &&
                    this.#currentEpisodeIndex !== -1
                ) {
                    const nextId = this.#episodesList[this.#currentEpisodeIndex + 1].media.media_id;
                    if (this.#app.router) {
                        this.#app.router.navigate(`/player/media/${nextId}`);
                    } else {
                        history.pushState({}, '', `/player/media/${nextId}`);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                }
            });
        }
    }
}

export default Player;
