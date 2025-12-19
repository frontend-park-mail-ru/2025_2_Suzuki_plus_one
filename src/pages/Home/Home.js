import './styles/hero.scss';
import './styles/section.scss';
import FilmCard from '@features/FilmCard/FilmCard.js';
import template from './ui/Home.hbs';
import { fetchMovies } from '@shared/api/moviesApi';
import { fetchGenres, fetchMoviesByGenreId } from '@shared/api/genresApi';
import dropdownTemplate from './ui/GenreDropdown.hbs';
import preview from '@assets/images/film_card.png';
import { createNewPayment } from '@shared/api/paymentApi.js';
import { getUserInfo } from '@shared/api/userApi.js';

/** Class representing the Home page, displays a list of movies. */
class Home {
    /** @type {HTMLElement} The parent element where the home page content will be rendered */
    #parent;
    #app;
    #genreId;
    #allGenres;
    #params;
    #selectedGenreIds = new Set();  // Используем Set для удобства

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
            this.#selectedGenreIds.add(params.id);
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
        await this.setupSubscribeButton();
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

    async setupSubscribeButton() {
        const subscribeButton = this.#parent.querySelector('.hero__subscribe');
        if (!subscribeButton) return;

        if (this.#app.isAuthorized) {
            try {
                const userInfo = await getUserInfo();
                if (userInfo.subscription_status === 'active') {
                    subscribeButton.textContent = 'Subscribed';
                    subscribeButton.disabled = true;
                    subscribeButton.classList.add('subscribed');
                    return;
                }
            } catch (error) {
                console.error('Failed to check subscription:', error);
                this.#showToast('Failed to check subscription status', 'error');
            }
        }

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
                subscribeButton.textContent = 'Get subscription';
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

        if (this.#genreId) {
            const initialItem = dropdown.querySelector(`.section__genre-item[data-genre-id="${this.#genreId}"]`);
            if (initialItem) {
                initialItem.classList.add('selected');
            }
        }

        dropdown.querySelectorAll('.section__genre-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                e.stopPropagation();

                const genreId = item.dataset.genreId;

                if (item.dataset.navigate === '/films') {
                    this.#selectedGenreIds.clear();
                    dropdown.querySelectorAll('.section__genre-item.selected')
                        .forEach(el => el.classList.remove('selected'));
                } else {
                    if (item.classList.contains('selected')) {
                        item.classList.remove('selected');
                        this.#selectedGenreIds.delete(genreId);
                    } else {
                        item.classList.add('selected');
                        this.#selectedGenreIds.add(genreId);
                    }
                }

                await this.renderMovies();
            });
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

        filmsContainer.innerHTML = '';

        await this.setupGenreButton();

        const selectedIds = Array.from(this.#selectedGenreIds);

        let films = [];

        if (!this.#allGenres) {
            await this.loadGenres();
        }

        if (selectedIds.length === 0) {
            sectionTitle.textContent = 'Popular films';
            const response = await fetchMovies();
            films = response.movies.map((film) => ({
                id: film.media_id,
                title: film.title,
                genres: film.genres ? film.genres.map(g => g.name).join(', ').toLowerCase() : '',
                release_date: film.release_date.substr(0, 4),
                poster: film.posters[0],
                type: 'film',
            }));
        } else if (selectedIds.length === 1) {
            const genreId = selectedIds[0];
            const genre = this.#allGenres.find(g => g.id == genreId);
            sectionTitle.textContent = genre ? genre.name : 'Unknown genre';

            const response = await fetchMoviesByGenreId(genreId);
            films = response.movies.map((film) => ({
                id: film.media_id,
                title: film.title,
                release_date: film.release_date.substr(0, 4),
                poster: film.posters[0],
            }));
        } else {
            const responses = await Promise.all(
                selectedIds.map(id => fetchMoviesByGenreId(id))
            );

            const movieSets = responses.map(resp => new Set(resp.movies.map(f => f.media_id)));

            let commonIds = movieSets.reduce((acc, set) =>
                new Set([...acc].filter(id => set.has(id))), movieSets[0] || new Set());

            const movieMap = new Map();
            responses.forEach(resp => {
                resp.movies.forEach(film => {
                    if (!movieMap.has(film.media_id)) {
                        movieMap.set(film.media_id, {
                            id: film.media_id,
                            title: film.title,
                            genres: film.genres ? film.genres.map(g => g.name).join(', ').toLowerCase() : '',
                            release_date: film.release_date.substr(0, 4),
                            poster: film.posters[0],
                            type: 'film',
                        });
                    }
                });
            });

            films = [...commonIds].map(id => movieMap.get(id));

            const selectedNames = selectedIds.map(id => {
                const g = this.#allGenres.find(genre => genre.id == id);
                return g ? g.name : 'Unknown';
            });
            sectionTitle.textContent = selectedNames.join(' & ');
        }

        films.forEach((film) => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement, this.#app);
            filmCard.render(film);
        });
    }
}

export default Home;
