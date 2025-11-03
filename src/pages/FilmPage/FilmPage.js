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

    afterRender() {
        this.setupScrollButtons();
    }

    setupScrollButtons() {
        const list = this.#parent.querySelector('#recommendations-section');
        const leftBtn = this.#parent.querySelector(
            '.films-recommendations__button--left'
        );
        const rightBtn = this.#parent.querySelector(
            '.films-recommendations__button--right'
        );

        if (!list || !leftBtn || !rightBtn) return;

        const scrollAmount = 300;

        leftBtn.addEventListener('click', () => {
            list.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth',
            });
        });

        rightBtn.addEventListener('click', () => {
            list.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        });

        const updateButtons = () => {
            leftBtn.style.opacity = list.scrollLeft <= 0 ? '0.5' : '1';
            rightBtn.style.opacity =
                list.scrollLeft >= list.scrollWidth - list.clientWidth - 10
                    ? '0.5'
                    : '1';
        };

        list.addEventListener('scroll', updateButtons);
        updateButtons();
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
