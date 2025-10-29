import FilmCard from '@features/Movies/FilmCard/FilmCard.js';
import template from './Home.hbs';
import bgPicture from '@assets/bg_picture.svg';
import { fetchMovies } from '@shared/api/moviesApi';

/** Class representing the Home page, displays a list of movies. */
class Home {
    /** @type {HTMLElement} The parent element where the home page content will be rendered */
    #parent;

    /**
     * Creates an instance of Home.
     * @param {HTMLElement} parent - The parent element to render the home page into.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Renders the home page content inside the parent element.
     * Fetches the list of movies from the API and renders each movie using FilmCard.
     * Appends each movie card to the container element with ID "filmsContainer".
     * @async
     */
    async render() {
        this.#parent.innerHTML = template({
            bgPictureUrl: bgPicture,
        });

        this.setupPlayButton();
        await this.renderMovies();
    }

    /**
     * Sets up the play button event listener for smooth scrolling.
     * @private
     */
    setupPlayButton() {
        const playButton = this.#parent.querySelector('.btn.play');
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

    /**
     * Fetches and renders the list of movies.
     * @private
     * @async
     */
    async renderMovies() {
        const filmsContainer = this.#parent.querySelector('#filmsContainer');
        const filmsData = await fetchMovies();

        console.log('Ответ от API:', filmsData);

        filmsData.forEach((film) => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement);
            filmCard.render(film);
        });
    }
}

export default Home;
