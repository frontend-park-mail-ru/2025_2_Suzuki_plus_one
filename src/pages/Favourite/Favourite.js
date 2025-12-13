import './styles/favourite.scss';
import FilmCard from '@features/FilmCard/FilmCard.js';
import template from './ui/Favourite.hbs';
import { fetchMovies } from '@shared/api/moviesApi';
import preview from '@assets/images/film_card.png';
import { fetchMyFavourite } from '@shared/api/favouriteApi.js';

class Favourite {
    #parent;
    #app;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
    }

    render() {
        this.#parent.innerHTML = template({});
        this.renderMovies();
    }

    async renderMovies() {
        const filmsContainer = this.#parent.querySelector('#filmsContainer');
        const response = await fetchMyFavourite();
        const films = response.medias.map((film) => ({
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
            type: film.media_type == 'movie' ? 'film' : 'series',
            likes: film.user_rating.likes,
            dislikes: film.user_rating.dislikes,
        }));

        films.forEach((film) => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement, this.#app);
            filmCard.render(film);
        });
    }
}

export default Favourite;
