import './styles/hero.scss';
import './styles/section.scss';
import FilmCard from '@features/FilmCard/FilmCard.js';
import template from './ui/Home.hbs';
import { fetchMovies } from '@shared/api/moviesApi';
import { fetchGenres, fetchMoviesByGenreId } from '@shared/api/genresApi';
import dropdownTemplate from './ui/GenreDropdown.hbs';
import yearDropdownTemplate from './ui/YearDropdown.hbs';
import sortDropdownTemplate from './ui/SortDropdown.hbs';
import { createNewPayment } from '@shared/api/paymentApi.js';
import { getUserInfo } from '@shared/api/userApi.js';

/** Class representing the Home page, displays a list of movies. */
class Home {
    #parent;
    #app;
    #genreId;
    #allGenres;
    #selectedGenreIds = new Set();   // выбранные жанры
    #currentFilms = [];              // текущий базовый список фильмов (после жанров)
    #selectedYear = null;            // выбранный год
    #currentSort = 'popularity';     // текущая сортировка

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        if (params.id) {
            this.#genreId = params.id;
            this.#selectedGenreIds.add(params.id);
        }
    }

    async render() {
        this.#parent.innerHTML = template({});
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
        if (existingToast) existingToast.remove();

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

        if (!this.#allGenres) await this.loadGenres();

        dropdown.innerHTML = dropdownTemplate({ genres: this.#allGenres });

        this.#selectedGenreIds.forEach(id => {
            const item = dropdown.querySelector(`.section__genre-item[data-genre-id="${id}"]`);
            if (item) item.classList.add('selected');
        });

        dropdown.querySelectorAll('.section__genre-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                e.stopPropagation();

                if (item.dataset.navigate === '/films') {
                    this.#selectedGenreIds.clear();
                    dropdown.querySelectorAll('.section__genre-item.selected').forEach(el => el.classList.remove('selected'));
                } else {
                    const genreId = item.dataset.genreId;
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

        genreButton.addEventListener('click', e => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        this.#setupDropdownClose(dropdown, genreButton);
    }

    async setupYearDropdown() {
        const yearButton = this.#parent.querySelector('#year_choose');
        const dropdown = this.#parent.querySelector('#yearDropdown');
        if (!dropdown) return;

        const years = [...new Set(
            this.#currentFilms.map(f => new Date(f.release_date).getFullYear())
        )].sort((a, b) => b - a);

        dropdown.innerHTML = yearDropdownTemplate({ years });

        if (this.#selectedYear) {
            const item = dropdown.querySelector(`.section__year-item[data-year="${this.#selectedYear}"]`);
            if (item) item.classList.add('selected');
        }

        dropdown.querySelectorAll('.section__year-item').forEach(item => {
            item.addEventListener('click', e => {
                e.stopPropagation();

                if (item.dataset.year === 'none') {
                    this.#selectedYear = null;
                    dropdown.querySelectorAll('.section__year-item.selected').forEach(i => i.classList.remove('selected'));
                } else {
                    const year = parseInt(item.dataset.year, 10);
                    if (this.#selectedYear === year) {
                        this.#selectedYear = null;
                        item.classList.remove('selected');
                    } else {
                        dropdown.querySelectorAll('.section__year-item.selected').forEach(i => i.classList.remove('selected'));
                        item.classList.add('selected');
                        this.#selectedYear = year;
                    }
                }

                this.renderCurrentFilms();
                dropdown.classList.remove('active');
                this.updateYearButtonText();
            });
        });

        yearButton.addEventListener('click', e => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        this.#setupDropdownClose(dropdown, yearButton);
        this.updateYearButtonText();
    }

    updateYearButtonText() {
        const button = this.#parent.querySelector('#year_choose');
        if (!button) return;
        button.textContent = this.#selectedYear ? this.#selectedYear : 'Year';
        button.classList.toggle('has-selection', this.#selectedYear !== null);
    }

    async setupSortDropdown() {
        const sortButton = this.#parent.querySelector('#sort_choose');
        const dropdown = this.#parent.querySelector('#sortDropdown');
        if (!dropdown) return;

        dropdown.innerHTML = sortDropdownTemplate({});

        const currentItem = dropdown.querySelector(`.section__sort-item[data-sort="${this.#currentSort}"]`);
        if (currentItem) currentItem.classList.add('selected');

        dropdown.querySelectorAll('.section__sort-item').forEach(item => {
            item.addEventListener('click', e => {
                e.stopPropagation();

                if (item.dataset.sort === 'none') {
                    this.#currentSort = 'popularity';
                    dropdown.querySelectorAll('.section__sort-item.selected').forEach(i => i.classList.remove('selected'));
                } else {
                    const sortType = item.dataset.sort;
                    dropdown.querySelectorAll('.section__sort-item.selected').forEach(i => i.classList.remove('selected'));
                    item.classList.add('selected');
                    this.#currentSort = sortType;
                }

                this.renderCurrentFilms();
                dropdown.classList.remove('active');
                this.updateSortButtonText();
            });
        });

        sortButton.addEventListener('click', e => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        this.#setupDropdownClose(dropdown, sortButton);
        this.updateSortButtonText();
    }

    updateSortButtonText() {
        const button = this.#parent.querySelector('#sort_choose');
        if (!button) return;

        const texts = {
            popularity: 'Sort',
            rating: 'Rating',
            title: 'Title A-Z',
            'year-desc': 'Year (newest)',
            'year-asc': 'Year (oldest)'
        };
        button.textContent = texts[this.#currentSort] || 'Sort';
        button.classList.toggle('has-selection', this.#currentSort !== 'popularity');
    }

    #setupDropdownClose(dropdown, button) {
        document.addEventListener('click', e => {
            if (!dropdown.contains(e.target) && e.target !== button) {
                dropdown.classList.remove('active');
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                dropdown.classList.remove('active');
            }
        });
    }

    async renderMovies() {
        const filmsContainer = this.#parent.querySelector('#filmsContainer');
        const sectionTitle = this.#parent.querySelector('#sectionTitle');

        filmsContainer.innerHTML = '';
        sectionTitle.textContent = 'Popular films';

        await this.setupGenreButton();

        let films = [];

        if (!this.#allGenres) await this.loadGenres();

        const selectedIds = Array.from(this.#selectedGenreIds);

        if (selectedIds.length === 0) {
            const response = await fetchMovies();
            films = response.movies.map(film => this.#mapFilm(film));
        } else if (selectedIds.length === 1) {
            const genreId = selectedIds[0];
            const genre = this.#allGenres.find(g => g.id == genreId);
            sectionTitle.textContent = genre ? genre.name : 'Unknown genre';

            const response = await fetchMoviesByGenreId(genreId);
            films = response.movies.map(film => this.#mapFilm(film));
        } else {
            const responses = await Promise.all(selectedIds.map(id => fetchMoviesByGenreId(id)));

            const movieSets = responses.map(resp => new Set(resp.movies.map(f => f.media_id)));
            let commonIds = movieSets.reduce((acc, set) => new Set([...acc].filter(id => set.has(id))), movieSets[0] || new Set());

            const movieMap = new Map();
            responses.forEach(resp => {
                resp.movies.forEach(film => {
                    if (!movieMap.has(film.media_id)) {
                        movieMap.set(film.media_id, this.#mapFilm(film));
                    }
                });
            });

            films = [...commonIds].map(id => movieMap.get(id));

            const names = selectedIds.map(id => {
                const g = this.#allGenres.find(genre => genre.id == id);
                return g ? g.name : 'Unknown';
            });
            sectionTitle.textContent = names.join(' & ');
        }

        this.#currentFilms = films;
        this.#selectedYear = null;
        this.#currentSort = 'popularity';

        await this.setupYearDropdown();
        await this.setupSortDropdown();

        this.renderCurrentFilms();
    }

    #mapFilm(film) {
        return {
            id: film.media_id,
            title: film.title,
            genres: film.genres ? film.genres.map(g => g.name).join(', ').toLowerCase() : '',
            release_date: film.release_date,
            poster: film.posters[0],
            type: 'film',
            user_rating: film.user_rating || { likes: 0, dislikes: 0 }
        };
    }

    renderCurrentFilms() {
        const filmsContainer = this.#parent.querySelector('#filmsContainer');
        filmsContainer.innerHTML = '';

        let displayed = this.#applyFiltersAndSort([...this.#currentFilms]);

        displayed.forEach(film => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement, this.#app);
            filmCard.render(film);
        });
    }

    #applyFiltersAndSort(films) {
        let result = films;

        if (this.#selectedYear !== null) {
            result = result.filter(film => new Date(film.release_date).getFullYear() === this.#selectedYear);
        }

        switch (this.#currentSort) {
            case 'popularity':
                break;
            case 'rating':
                result = [...result].sort((a, b) => (b.user_rating?.likes || 0) - (a.user_rating?.likes || 0));
                break;
            case 'title':
                result = [...result].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'year-desc':
                result = [...result].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                break;
            case 'year-asc':
                result = [...result].sort((a, b) => new Date(a.release_date) - new Date(a.release_date));
                break;
        }

        return result;
    }
}

export default Home;
