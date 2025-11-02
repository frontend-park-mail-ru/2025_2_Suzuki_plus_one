import './styles/films.scss'
import template from './ui/FilmCard.hbs';

/** Class representing a Film Card */
class FilmCard {
    #parent;
    #app;

    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
    }

    /**
     * @param {Object} data
     * @param {string} data.id
     * @param {string} data.title
     * @param {string} data.year
     * @param {string} data.preview
     * @param {string[]} data.genres
     */
    render(data) {
        this.#parent.innerHTML = template(data);
    }
}

export default FilmCard;
