import './styles/player.scss';
import template from './ui/Player.hbs';
import { initPlayerControls } from './js/player-controls.js';
import video from '@assets/videos/trailer.mp4';
import poster from '@assets/images/poster.png';
import { fetchTrailer } from '@shared/api/trailerApi.js';
import RewindLeft from '@shared/assets/images/icons/circular-arrow-left.svg?raw';
import RewindRight from '@shared/assets/images/icons/circular-arrow-right.svg?raw';

class Player {
    #parent;
    #app;
    #filmId;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.#filmId = params.id;
    }

    async render() {
        // todo потом вставить что-то такое когда ручки готовы будут
        // const film = await this.fetchFilm(this.#filmId);
        // this.#parent.innerHTML = template({
        //     video: film.videoUrl,
        //     poster: film.poster,
        // });

        const film = await fetchTrailer(this.#filmId);
        const videoUrl = film.trailers && film.trailers.length > 0 
                ? film.trailers[0] 
                : null;

            const posterUrl = film.posters && film.posters.length > 0 
                ? film.posters[0] 
                : poster;

            if (!videoUrl) {
                this.#parent.innerHTML = '<p style="text-align:center; color:red;">Trailer not available</p>';
                return;
            }

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
