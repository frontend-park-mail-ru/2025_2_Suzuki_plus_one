import template from './ui/StarPage.hbs';
import star_photo from '@assets/images/star_photo.png';
import { initBiographyToggle } from './showMore.js';
import preview from '@assets/images/film_card.png';
import FilmCard from '@features/FilmCard/FilmCard.js';

class StarPage {
    #parent;
    #app;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.params = params;
    }

    render() {
        this.#parent.innerHTML = template({ star_photo });
        this.renderFilms();
    }

    afterRender() {
        initBiographyToggle(this.#parent);
    }

    renderFilms() {
        const filmsContainer = this.#parent.querySelector(
            '#recommendations-section'
        );
        // const filmsData = await fetchMoviesForStar(this.params.id);

        const filmsData = [
            {
                id: '123',
                title: 'Interstellar',
                preview: preview,
                genres: 'drama',
                year: '2015',
            },
        ];
        filmsData.forEach((film) => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement, this.#app);
            filmCard.render(film);
        });
    }
}
export default StarPage;
