import './styles/hero.scss';
import './styles/section.scss';
import FilmCard from '@features/FilmCard/FilmCard.js';
import template from './ui/Home.hbs';
import { fetchMovies } from '@shared/api/moviesApi';
import { fetchGenres, fetchMoviesByGenreId } from '@shared/api/genresApi';
import dropdownTemplate from './ui/GenreDropdown.hbs';
import preview from '@assets/images/film_card.png';
import {createNewPayment} from '@shared/api/paymentApi.js';

/** Class representing the Home page, displays a list of movies. */
class Home {
    /** @type {HTMLElement} The parent element where the home page content will be rendered */
    #parent;
    #app;
    #genreId;
    #allGenres;
    #params;

    /**
     * Creates an instance of Home.
     * @param {HTMLElement} parent - The parent element to render the home page into.
     * @param {Object} appInstance - The main application instance.
     */
    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        if (params.id) {
            this.#genreId = params.id;
        }
    }

    /**
     * Renders the home page content inside the parent element.
     * Fetches the list of movies from the API and renders each movie using FilmCard.
     * Appends each movie card to the container element with ID "filmsContainer".
     * @async
     */
    async render() {
        this.#parent.innerHTML = template({});
        //     await this.loadGenres();
        await this.renderMovies();
    }

    async afterRender() {
        this.setupPlayButton();
        this.setupSubscribeButton();
    }

    async loadGenres() {
        if (this.#allGenres) return;
        const response = await fetchGenres();
        this.#allGenres = response.genres.map((genre) => ({
            id: genre.id,
            name: genre.name,
        }));
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


setupSubscribeButton() {
    const subscribeButton = this.#parent.querySelector('.hero__subscribe');
    if (!subscribeButton) return;

    subscribeButton.addEventListener('click', async () => {
        if (!this.#app.isAuthorized) {
            this.#showToast('Log in to subscribe', 'auth');
            return;
        }

        subscribeButton.disabled = true;
        subscribeButton.textContent = 'Redirecting...';

        try {
            await createNewPayment();
        } catch (error) {
            console.error('Payment failed:', error);
            this.#showToast('Failed to start subscription. Try again later.', 'error');
            subscribeButton.disabled = false;
            subscribeButton.textContent = 'Subscribe';
        }
    });
}

#showToast(message, type = 'auth') {
    const existingToast = document.querySelector('.action-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `action-toast action-toast--${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    toast.offsetHeight;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3500);
}

    
    async setupGenreButton() {
        const genreButton = this.#parent.querySelector('#genre_choose');
        const dropdown = this.#parent.querySelector('#genreDropdown');
        if (!dropdown) return;

        if (!this.#allGenres) {
            await this.loadGenres();
        }

        dropdown.innerHTML = dropdownTemplate({
            genres: this.#allGenres,
        });

        genreButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== genreButton) {
                dropdown.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdown.classList.remove('active');
            }
        });
    }

    async renderMovies() {
        const filmsContainer = this.#parent.querySelector('#filmsContainer');
        const sectionTitle = this.#parent.querySelector('#sectionTitle');
        let response;
        let films = [];
        let genre;

        await this.setupGenreButton();
        if (this.#genreId) {
            if (!this.#allGenres) {
                await this.loadGenres();
            }

            genre = this.#allGenres.find((g) => g.id == this.#genreId);
            sectionTitle.textContent = genre ? genre.name : 'Unknown genre';
            response = await fetchMoviesByGenreId(this.#genreId);
            films = response.movies.map((film) => ({
                id: film.media_id,
                title: film.title,
                //             genres: film.genres ? film.genres.map(g => g.name).join(', ').toLowerCase() : '',
                release_date: film.release_date.substr(0, 4),
                poster: film.posters[0],
            }));
        } else {
            response = await fetchMovies();
            films = response.movies.map((film) => ({
                id: film.media_id,
                title: film.title,
                genres: film.genres
                    ? film.genres
                          .map((g) => g.name)
                          .join(', ')
                          .toLowerCase()
                    : '',
                release_date: film.release_date.substr(0, 4),
                poster: film.posters[0],
                type: 'film',
            }));
        }

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
