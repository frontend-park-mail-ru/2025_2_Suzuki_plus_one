import template from './ui/StarPage.hbs';
import star_photo from '@assets/images/star_photo.png';
import { initBiographyToggle } from './showMore.js';
import { fetchStar } from '@shared/api/starApi.js';
import { fetchStarMovies } from '@shared/api/starMoviesApi.js';

import preview from '@assets/images/film_card.png';
import FilmCard from '@features/FilmCard/FilmCard.js';

class StarPage {
    #parent;
    #app;
    #starId;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.params = params;
        this.#starId = params.id;
    }

    async render() {
        try {
            const actor = await fetchStar(this.#starId);

            const photo =
                actor.image_urls?.length > 0
                    ? actor.image_urls[0]
                    : star_photo;

            this.#parent.innerHTML = template({
                name: actor.name,
                bio: actor.bio,
                photo: photo,
                birth_date: actor.birth_date?.split("T")[0],
            });

            this.afterRender();

            this.renderFilmCards();
        } catch (err) {
            console.error("Actor page error:", err);
            this.#parent.innerHTML = `<h2 style="color:red;text-align:center">Actor not found</h2>`;
        }

    }

    afterRender() {
        initBiographyToggle(this.#parent);
    }

    async renderFilmCards() {
        const filmsContainer = this.#parent.querySelector('#filmsContainer');
        const response = await fetchStarMovies(this.#starId);
        const films = response.medias.map(film => ({
            id: film.media_id,
            title: film.title,
            genres: film.genres ? film.genres.map(g => g.name).join(', ').toLowerCase() : '',
            release_date: film.release_date.substr(0, 4),
            poster: film.posters[0],
        }));

        films.forEach((film) => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement, this.#app);
            filmCard.render(film);
        });
    }
}
export default StarPage;
