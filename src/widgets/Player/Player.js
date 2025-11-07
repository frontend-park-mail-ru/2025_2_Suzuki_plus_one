import './styles/player.scss';
import template from './ui/Player.hbs';
import { initPlayerControls } from './js/player-controls.js';
import video from '@assets/videos/trailer.mp4';
import poster from '@assets/images/poster.png';
import { fetchMedia } from '@shared/api/moviesApi.js'; 

class Player {
    #parent;
    #app;
    #filmId;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.#filmId = params.filmId || params.id;;
    }

    async render() {
        // todo потом вставить что-то такое когда ручки готовы будут
        // const film = await this.fetchFilm(this.#filmId);
        // this.#parent.innerHTML = template({
        //     video: film.videoUrl,
        //     poster: film.poster,
        // });
        let videoUrl = null;

        const state = this.#app.currentState;
        if (state?.mediaUrl) {
            videoUrl = state.mediaUrl;
        } else if (this.#filmId) {
            try {
                const media = await fetchMedia(this.#filmId);
                videoUrl = media.url;
            } catch (err) {
                console.error('Failed to fetch media:', err);
                this.#parent.innerHTML = '<p style="color: red; text-align: center;">Video not available</p>';
                return;
            }
        }
        
        this.#parent.innerHTML = template({ 
            video: videoUrl,
            poster 
        });
        
        requestAnimationFrame(() => {
            initPlayerControls();
        });
    }
}

export default Player;
