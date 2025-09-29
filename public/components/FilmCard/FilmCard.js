/** Class representing a Film Card */
class FilmCard {
    /** @type {HTMLElement} The parent element where the film card will be rendered. */
    #parent
    /**
     * Creates an instance of FilmCard.
     * @param {HTMLElement} parent - The parent element to render film into it.
     */
    constructor(parent) {
        this.#parent = parent
    }
    /**
     *
     * @param {Object} data - The movie data for the template.
     * @param {string} data.title - The title of the movie.
     * @param {string} data.year - The release year of the movie.
     * @param {string} data.preview - The URL of the movie's preview image.
     * @param {string[]} data.genres - The genres of the movie.
     */
    render(data) {
        const template = Handlebars.templates['FilmCard/FilmCard']
        this.#parent.innerHTML = template(data)
    }
}
export default FilmCard
