import FilmCard from "../FilmCard/FilmCard.js"

class Home {
    #parent
    constructor(parent) {
        this.#parent = parent;
    }
    async render() {
        const template = Handlebars.templates['Home/Home'];
        this.#parent.innerHTML = template({});

        try {
            const response = await fetch('http://217.16.18.125/api/v1/movies', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error. status: ${response.status}`);
            }

            const filmsData = await response.json();
            console.log("Ответ от API:", filmsData);
            const container = this.#parent.querySelector('#filmsContainer');

            filmsData.forEach(film => {
                const filmElement = document.createElement("div");
                container.appendChild(filmElement);
                const filmCard = new FilmCard(filmElement);
                filmCard.render(film);
            });

        } catch (err) {
            console.error("Error fetchin movies:", err);
        }
}
}
export default Home;