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

class Home {
    #parent;
    #app;
    #genreId;
    #allGenres;
    #selectedGenreIds = new Set();
    #currentFilms = [];
    #selectedYear = null;
    #currentSort = 'popularity';

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
        await this.loadGenres();
        await this.#initialSetup();           
        await this.#updateFilmsByGenres();    
        this.#setupGlobalDropdownClose();    
    }

    async afterRender() {
        this.setupPlayButton();
        await this.setupSubscribeButton();
    }

    async loadGenres() {
        if (this.#allGenres) return;
        const response = await fetchGenres();
        this.#allGenres = response.genres.map(g => ({ id: g.id, name: g.name }));
    }

    async #initialSetup() {
        await this.#setupGenreDropdownContent();  
        this.#setupGenreButtonClick();           

        await this.#setupYearDropdownContent();   
        this.#setupYearButtonClick();             

        this.#setupSortDropdownContent();        
        this.#setupSortButtonClick();             
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

    #setupGlobalDropdownClose() {
        document.addEventListener('click', (e) => {
            const buttons = ['#genre_choose', '#year_choose', '#sort_choose'];
            const clickedButton = buttons.some(sel => e.target.closest(sel));
            const clickedInsideDropdown = e.target.closest('.section__button-dropdown');

            if (!clickedButton && !clickedInsideDropdown) {
                this.#parent.querySelectorAll('.section__button-dropdown.active')
                    .forEach(d => d.classList.remove('active'));
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.#parent.querySelectorAll('.section__button-dropdown.active')
                    .forEach(d => d.classList.remove('active'));
            }
        });
    }

    async #setupGenreDropdownContent() {
        const dropdown = this.#parent.querySelector('#genreDropdown');
        if (!dropdown) return;

        dropdown.innerHTML = dropdownTemplate({ genres: this.#allGenres });

        const noneItem = dropdown.querySelector('.section__genre-item[data-navigate="/films"]');
        if (noneItem) {
            noneItem.classList.toggle('selected', this.#selectedGenreIds.size === 0);
        }

        this.#selectedGenreIds.forEach(id => {
            const item = dropdown.querySelector(`.section__genre-item[data-genre-id="${id}"]`);
            if (item) item.classList.add('selected');
        });
    }

    #setupGenreButtonClick() {
        const button = this.#parent.querySelector('#genre_choose');
        const dropdown = this.#parent.querySelector('#genreDropdown');
        if (!button || !dropdown) return;

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.#closeOtherDropdowns('genreDropdown');
            dropdown.classList.toggle('active');
        });

        dropdown.addEventListener('click', async (e) => {
            const item = e.target.closest('.section__genre-item');
            if (!item) return;
            e.stopPropagation();

            const noneItem = dropdown.querySelector('.section__genre-item[data-navigate="/films"]');

            if (item.dataset.navigate === '/films') {
                this.#selectedGenreIds.clear();
                dropdown.querySelectorAll('.section__genre-item.selected').forEach(el => el.classList.remove('selected'));
                if (noneItem) noneItem.classList.add('selected');  
            } else {
                const id = item.dataset.genreId;
                item.classList.toggle('selected');
                if (item.classList.contains('selected')) {
                    this.#selectedGenreIds.add(id);
                } else {
                    this.#selectedGenreIds.delete(id);
                }
                if (noneItem) noneItem.classList.remove('selected'); 
            }

            await this.#updateFilmsByGenres();
            dropdown.classList.remove('active');
        });
    }

    async #setupYearDropdownContent() {
        const dropdown = this.#parent.querySelector('#yearDropdown');
        if (!dropdown) return;

        const years = [...new Set(this.#currentFilms.map(f => new Date(f.release_date).getFullYear()))]
            .sort((a, b) => b - a);

        dropdown.innerHTML = yearDropdownTemplate({ years });

        dropdown.querySelectorAll('.section__year-item').forEach(item => {
            const isSelected = (item.dataset.year === 'none' && !this.#selectedYear) ||
                               (item.dataset.year && parseInt(item.dataset.year) === this.#selectedYear);
            item.classList.toggle('selected', isSelected);
        });
    }

    #setupYearButtonClick() {
        const button = this.#parent.querySelector('#year_choose');
        const dropdown = this.#parent.querySelector('#yearDropdown');
        if (!button || !dropdown) return;

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.#closeOtherDropdowns('yearDropdown');
            dropdown.classList.toggle('active');
        });

        dropdown.addEventListener('click', (e) => {
            const item = e.target.closest('.section__year-item');
            if (!item) return;
            e.stopPropagation();

            if (item.dataset.year === 'none') {
                this.#selectedYear = null;
            } else {
                this.#selectedYear = parseInt(item.dataset.year);
            }

            this.renderCurrentFilms();
            dropdown.classList.remove('active');
            this.updateYearButtonText();
        });

        this.updateYearButtonText();
    }

    updateYearButtonText() {
        const btn = this.#parent.querySelector('#year_choose');
        if (btn) {
            btn.textContent = this.#selectedYear ? this.#selectedYear : 'Year';
            btn.classList.toggle('has-selection', !!this.#selectedYear);
        }
    }

    #setupSortDropdownContent() {
        const dropdown = this.#parent.querySelector('#sortDropdown');
        if (!dropdown) return;

        dropdown.innerHTML = sortDropdownTemplate({});

        dropdown.querySelectorAll('.section__sort-item').forEach(item => {
            item.classList.toggle('selected',
                (item.dataset.sort === 'popularity' && this.#currentSort === 'popularity') ||
                item.dataset.sort === this.#currentSort
            );
        });
    }

    #setupSortButtonClick() {
        const button = this.#parent.querySelector('#sort_choose');
        const dropdown = this.#parent.querySelector('#sortDropdown');
        if (!button || !dropdown) return;

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.#closeOtherDropdowns('sortDropdown');
            dropdown.classList.toggle('active');
        });

        dropdown.addEventListener('click', (e) => {
            const item = e.target.closest('.section__sort-item');
            if (!item) return;
            e.stopPropagation();

            this.#currentSort = item.dataset.sort === 'popularity' ? 'popularity' : item.dataset.sort;

            this.renderCurrentFilms();
            dropdown.classList.remove('active');
            this.updateSortButtonText();
        });

        this.updateSortButtonText();
    }

    updateSortButtonText() {
        const btn = this.#parent.querySelector('#sort_choose');
        if (!btn) return;
        const texts = {
            popularity: 'Sort',
            rating: 'Rating',
            title: 'Title A-Z',
            'year-desc': 'Year (newest)',
            'year-asc': 'Year (oldest)'
        };
        btn.textContent = texts[this.#currentSort] || 'Sort';
        btn.classList.toggle('has-selection', this.#currentSort !== 'popularity');
    }

    #closeOtherDropdowns(currentId) {
        this.#parent.querySelectorAll('.section__button-dropdown').forEach(d => {
            if (d.id !== currentId) d.classList.remove('active');
        });
    }

    async #updateFilmsByGenres() {
        const filmsContainer = this.#parent.querySelector('#filmsContainer');
        const sectionTitle = this.#parent.querySelector('#sectionTitle');
        filmsContainer.innerHTML = '';
        sectionTitle.textContent = 'Popular films';

        let films = [];
        const selectedIds = Array.from(this.#selectedGenreIds);

        if (selectedIds.length === 0) {
            const resp = await fetchMovies();
            films = resp.movies.map(f => this.#mapFilm(f));
        } else if (selectedIds.length === 1) {
            const resp = await fetchMoviesByGenreId(selectedIds[0]);
            films = resp.movies.map(f => this.#mapFilm(f));
            const genre = this.#allGenres.find(g => g.id == selectedIds[0]);
            sectionTitle.textContent = genre?.name || 'Unknown';
        } else {
            const responses = await Promise.all(selectedIds.map(id => fetchMoviesByGenreId(id)));
            const sets = responses.map(r => new Set(r.movies.map(m => m.media_id)));
            const common = sets.reduce((a, s) => new Set([...a].filter(x => s.has(x))), sets[0] || new Set());

            const map = new Map();
            responses.forEach(r => r.movies.forEach(m => map.set(m.media_id, this.#mapFilm(m))));
            films = [...common].map(id => map.get(id));

            const names = selectedIds.map(id => this.#allGenres.find(g => g.id == id)?.name || 'Unknown');
            sectionTitle.textContent = names.join(' & ');
        }

        this.#currentFilms = films;
        this.#selectedYear = null;    
        this.#currentSort = 'popularity';

        await this.#setupYearDropdownContent();
        await this.#setupSortDropdownContent();
        await this.#setupGenreDropdownContent();

        this.updateYearButtonText();
        this.updateSortButtonText();
        this.renderCurrentFilms();
    }

    #mapFilm(film) {
        return {
            id: film.media_id,
            title: film.title,
            genres: film.genres ? film.genres.map(g => g.name).join(', ').toLowerCase() : '',
            release_date: new Date(film.release_date).getFullYear().toString(),
            poster: film.posters[0],
            type: 'film',
            user_rating: film.user_rating || { likes: 0 }
        };
    }

    renderCurrentFilms() {
        const container = this.#parent.querySelector('#filmsContainer');
        container.innerHTML = '';

        let list = this.#applyFiltersAndSort([...this.#currentFilms]);

        list.forEach(film => {
            const el = document.createElement('div');
            container.appendChild(el);
            new FilmCard(el, this.#app).render(film);
        });
    }

    #applyFiltersAndSort(films) {
        let result = films;

        if (this.#selectedYear !== null) {
            result = result.filter(f => new Date(f.release_date).getFullYear() === this.#selectedYear);
        }

        switch (this.#currentSort) {
            case 'rating':
                result.sort((a, b) => (b.user_rating.likes || 0) - (a.user_rating.likes || 0));
                break;
            case 'title':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'year-desc':
                result.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                break;
            case 'year-asc':
                result.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                break;
        }

        return result;
    }
}

export default Home;
