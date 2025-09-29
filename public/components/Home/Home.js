import FilmCard from '../FilmCard/FilmCard.js'
/** Class representing the Home page, displays a list of movies. */
class Home {
    /** @type {HTMLElement} The parent element where the home page content will be rendered */
    #parent
    /**
     * Creates an instance of Home.
     * @param {HTMLElement} parent - The parent element to render the home page into.
     */
    constructor(parent) {
        this.#parent = parent
    }
    /**
     * Renders the home page content inside the parent element.
     * Fetches the list of movies from the API and renders each movie using FilmCard.
     * Appends each movie card to the container element with ID "filmsContainer".
     * Logs errors to the console if the fetch fails.
     * @async
     */
    async render() {
        const template = Handlebars.templates['Home/Home']
        this.#parent.innerHTML = template({})

        try {
            const response = await fetch('/api/v1/movies', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error. status: ${response.status}`)
            }

            const filmsData = await response.json()
            console.log('Ответ от API:', filmsData)
            const container = this.#parent.querySelector('#filmsContainer')

            filmsData.forEach((film) => {
                const filmElement = document.createElement('div')
                container.appendChild(filmElement)
                const filmCard = new FilmCard(filmElement)
                filmCard.render(film)
            })
        } catch (err) {
            console.error('Error fetchin movies:', err)
        }
    }
}
export default Home
