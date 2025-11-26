import './styles/hero.scss';
import './styles/section.scss';
import FilmCard from '@features/FilmCard/FilmCard.js';
import template from './ui/Home.hbs';
import { fetchMovies } from '@shared/api/moviesApi';
import { fetchGenres, fetchMoviesByGenreId } from '@shared/api/genresApi'
import dropdownTemplate from './ui/GenreDropdown.hbs';
import preview from '@assets/images/film_card.png';

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
        await this.loadGenres();
        await this.renderMovies();
    }

    async afterRender() {
        this.setupPlayButton();
        this.setupGenreButton();
    }

    async loadGenres() {
        const response = await fetchGenres();
        this.#allGenres = response.genres.map(genre => ({
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

    async setupGenreButton() {
        const genreButton = this.#parent.querySelector('#genre_choose');
        const dropdown = this.#parent.querySelector('#genreDropdown');
        if (!dropdown) return;

        const response = await fetchGenres();
        console.log(response);
        
        dropdown.innerHTML = dropdownTemplate({
            genres: this.#allGenres
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

        if (this.#genreId) {
            genre = this.#allGenres.find(g => g.id == this.#genreId);
            sectionTitle.textContent = genre ? genre.name : "Unknown genre";
            response = await fetchMoviesByGenreId(this.#genreId);    
            films = response.medias.map(film => ({
                id: film.media_id,
                title: film.title,
   //             genres: film.genres ? film.genres.map(g => g.name).join(', ').toLowerCase() : '',
                release_date: film.release_date.substr(0, 4),
   //             poster: film.posters[0],
            }));
        }
        else {
            response = await fetchMovies();
            films = response.movies.map(film => ({
                id: film.media_id,
                title: film.title,
                genres: film.genres ? film.genres.map(g => g.name).join(', ').toLowerCase() : '',
                release_date: film.release_date.substr(0, 4),
                poster: film.posters[0],
                type: "film",
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
