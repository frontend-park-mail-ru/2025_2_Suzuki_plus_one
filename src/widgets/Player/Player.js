import './styles/player.scss';
import template from './ui/Player.hbs';
import { initPlayerControls } from './js/player-controls.js';
import video from '@assets/videos/trailer.mp4';
import poster from '@assets/images/StrangerThings.png';
import { fetchTrailer } from '@shared/api/trailerApi.js';
import { fetchMedia } from '@shared/api/moviesApi.js';
import RewindLeft from '@shared/assets/images/icons/circular-arrow-left.svg?raw';
import RewindRight from '@shared/assets/images/icons/circular-arrow-right.svg?raw';

class Player {
    #parent;
    #app;
    #filmId;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.type = params.type;
        this.#filmId = params.id;
    }

    async render() {
        // todo потом вставить что-то такое когда ручки готовы будут
        // const film = await this.fetchFilm(this.#filmId);
        // this.#parent.innerHTML = template({
        //     video: film.videoUrl,
        //     poster: film.poster,
        // });
        var film, videoUrl;

        if (this.type == 'trailer') {
            film = await fetchTrailer(this.#filmId);
            videoUrl = film.trailers && film.trailers.length > 0 ? film.trailers[0] : null;
            if (!videoUrl) {
                this.#parent.innerHTML =
                    '<p style="text-align:center; color:red;">Trailer is not available</p>';
                return;
            }
        } else if (this.type == 'media') {
            try {
                film = await fetchMedia(this.#filmId);
                videoUrl = film.url ? film.url : null;
                if (!videoUrl) {
                    this.#parent.innerHTML =
                        '<p style="text-align:center; color:red;">Episode is not available</p>';
                    return;
                }
            } catch {
                this.#parent.innerHTML =
                    '<p style="text-align:center; color:red;">Episode is not available</p>';
                return;
            }
        }

        const posterUrl = film.posters && film.posters.length > 0 ? film.posters[0] : poster;

        this.#parent.innerHTML = template({
            video: videoUrl,
            poster: posterUrl,
            rewindLeftIcon: RewindLeft,
            rewindRightIcon: RewindRight,
        });

        // this.#parent.innerHTML = template({
        //      video,
        //     poster,
        //     rewindLeftIcon: RewindLeft,
        //     rewindRightIcon: RewindRight,
        //     });

        requestAnimationFrame(() => {
            initPlayerControls();
        });
    }
}

export default Player;
