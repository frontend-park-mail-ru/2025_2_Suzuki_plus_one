import './styles/player.scss';
import template from './ui/Player.hbs';
import { initPlayerControls } from './js/player-controls.js';
import video from '@assets/videos/trailer.mp4';
import poster from '@assets/images/poster.png';
import { fetchTrailer } from '@shared/api/trailerApi.js';

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
            });

        // this.#parent.innerHTML = template({ video, poster });

        requestAnimationFrame(() => {
            initPlayerControls();
        });
    }
}

export default Player;
