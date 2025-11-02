import './styles/player.scss';
import template from './ui/Player.hbs';
import { initPlayerControls } from './js/player-controls.js';
import video from '@assets/videos/trailer.mp4';
import poster from '@assets/images/poster.png';

class Player {
    #parent;
    #app;
    #filmId;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.#filmId = params.filmId;
    }

    async render() {
        // todo потом вставить что-то такое когда ручки готовы будут
        // const film = await this.fetchFilm(this.#filmId);
        // this.#parent.innerHTML = template({
        //     video: film.videoUrl,
        //     poster: film.poster,
        // });

        this.#parent.innerHTML = template({ video, poster });
        requestAnimationFrame(() => {
            initPlayerControls();
        });
    }
}

export default Player;
