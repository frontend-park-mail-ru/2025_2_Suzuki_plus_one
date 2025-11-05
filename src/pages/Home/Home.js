import './styles/hero.scss';
import FilmCard from '@features/FilmCard/FilmCard.js';
import template from './ui/Home.hbs';
import { fetchMovies } from '@shared/api/moviesApi';
import preview from '@assets/images/film_card.png';

/** Class representing the Home page, displays a list of movies. */
class Home {
    /** @type {HTMLElement} The parent element where the home page content will be rendered */
    #parent;
    #app;

    /**
     * Creates an instance of Home.
     * @param {HTMLElement} parent - The parent element to render the home page into.
     * @param {Object} appInstance - The main application instance.
     */
    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
    }

    /**
     * Renders the home page content inside the parent element.
     * Fetches the list of movies from the API and renders each movie using FilmCard.
     * Appends each movie card to the container element with ID "filmsContainer".
     * @async
     */
    render() {
        this.#parent.innerHTML = template({});
        this.renderMovies();
    }

    afterRender() {
        this.setupPlayButton();
    }

    /**
     * Sets up the play button event listener for smooth scrolling.
     * @private
     */
    setupPlayButton() {
        const playButton = this.#parent.querySelector('.hero__button.button');
        const filmsContainer = this.#parent.querySelector('#filmsContainer');

        if (playButton && filmsContainer) {
            playButton.addEventListener('click', () => {
                filmsContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        }
    }

    async renderMovies() {
        const filmsContainer = this.#parent.querySelector('#filmsContainer');
        const response = await fetchMovies();
        const films = response.movies.map(film => ({
            id: film.media_id,
            title: film.title,
            genres: film.genres ? film.genres.join(', ').toLowerCase() : '',
            release_date: film.release_date.substr(0, 4),
            poster: film.posters[0],
        }));

        // const filmsData = [
        //     {
        //         id: '123',
        //         title: 'Interstellar',
        //         preview: preview,
        //         genres: 'drama',
        //         year: '2015',
        //     },
        // ];
        films.forEach((film) => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement, this.#app);
            filmCard.render(film);
        });
    }
}

export default Home;
