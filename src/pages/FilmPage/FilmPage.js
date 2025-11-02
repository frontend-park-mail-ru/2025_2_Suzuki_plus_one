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

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.params = params;
    }

    render() {
        const filmId = this.params.id;
        this.#parent.innerHTML = template({
            poster,
            id: filmId,
        });
        this.renderStarCards();
        this.renderFilms();
    }

    renderStarCards() {
        const starsContainer = this.#parent.querySelector('#stars-section');
        // const starData = await fetchStars(this.params.id);

        const starData = [
            {
                id: '456',
                star_name: 'Matthew McConaughey',
                role_name: 'Cooper',
                star_photo: star_photo,
            },
        ];
        starData.forEach((star) => {
            const starElement = document.createElement('div');
            starsContainer.appendChild(starElement);
            const starCard = new StarCard(starElement, this.#app);
            starCard.render(star);
        });
    }

    renderFilms() {
        const filmsContainer = this.#parent.querySelector(
            '#recommendations-section'
        );

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

export default FilmPage;
