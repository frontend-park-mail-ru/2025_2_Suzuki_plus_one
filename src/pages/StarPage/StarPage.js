import template from './ui/StarPage.hbs';
import star_photo from '@assets/images/star_photo.png'
import { initBiographyToggle } from './showMore.js';
import preview from '@assets/images/film_card.png';
import FilmCard from '@features/FilmCard/FilmCard.js';

class StarPage {
    #parent;
    #app;

    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
    }

    render() {
        this.#parent.innerHTML = template({ star_photo });
        initBiographyToggle(this.#parent);

        this.#parent.querySelector('#filmPage')
            ?.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.#app.setPage('filmPage');
            });

        this.renderFilms();
    }

    renderFilms() {
        const filmsContainer = this.#parent.querySelector('#recommendations-section');
        //   const filmsData = await fetchMovies();

        const filmsData = [{ title: "Interstellar", preview: preview, genres: "drama", year: "2015" }]
        filmsData.forEach((film) => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement, this.#app);
            filmCard.render(film);
        });
    }
}
export default StarPage;
