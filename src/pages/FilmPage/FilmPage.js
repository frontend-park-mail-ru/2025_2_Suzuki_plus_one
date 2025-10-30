import './styles/film-banner.scss';
import './styles/stars-section.scss';
import './styles/films-recommendations.scss';
import template from './ui/FilmPage.hbs';
import poster from '@assets/images/poster.png';
import star_photo from '@assets/images/star_photo.png';
import StarCard from '@features/StarCard/StarCard.js';
import FilmCard from '@features/FilmCard/FilmCard.js';
import preview from '@assets/images/film_card.png';

class FilmPage {
    #parent;
    #app;

    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
    }

    render() {
        this.#parent.innerHTML = template({ poster });
        this.renderStarCards();
        this.renderFilms();

        this.#parent
            .querySelector('#playerLink')
            ?.addEventListener('click', (e) => {
                e.preventDefault();
                this.#app.setPage('playerPage');
            });
    }

    renderStarCards() {
        const starsContainer = this.#parent.querySelector('#stars-section');
        //    const filmsData = await fetchMovies();

        //    console.log('Ответ от API:', filmsData);

        const starData = [
            { star_name: "Matthew McConaughey", role_name: "Cooper", star_photo: star_photo }
        ];
        starData.forEach((star) => {
            const starElement = document.createElement('div');
            starsContainer.appendChild(starElement);
            const starCard = new StarCard(starElement, this.#app);
            starCard.render(star);
        });
    }

    renderFilms() {
        const filmsContainer = this.#parent.querySelector('#recommendations-section');

        const filmsData = [{ title: "Interstellar", preview: preview, genres: "drama", year: "2015" }]
        filmsData.forEach((film) => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement, this.#app);
            filmCard.render(film);
        });
    }
}

export default FilmPage;
