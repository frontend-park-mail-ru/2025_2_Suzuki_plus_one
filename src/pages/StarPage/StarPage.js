import template from './ui/StarPage.hbs';
import star_photo from '@assets/images/star_photo.png';
import { initBiographyToggle } from './showMore.js';
import preview from '@assets/images/film_card.png';
import FilmCard from '@features/FilmCard/FilmCard.js';

class StarPage {
    #parent;
    #app;
    #starId;

    constructor(parent, appInstance, params = {}) {
        this.#parent = parent;
        this.#app = appInstance;
        this.params = params;
        this.#starId = params.id;
    }

    async render() {
        const actorData = await fetchStar(this.#starId);
        // const actorData = {
        //     id: 1,
        //     preview: star_photo,
        //     name: 'Matthew McConaughey',
        //     birth_date: 'November 4, 1969',
        //     birth_name: 'Matthew David McConaughey',
        //     bio: `American actor and producer. He first gained notice for his supporting performance in the coming-of-age comedy Dazed and Confused (1993), which was considered by many to be his breakout role. After a number of supporting roles in films including Angels in the Outfield (1994) and Texas Chainsaw Massacre: The Next Generation (1994), his breakthrough performance as a leading man was in the legal drama A Time to Kill (1996).`,
        // };
        this.#parent.innerHTML = template(actorData);
        this.renderFilms();
    }

    afterRender() {
        initBiographyToggle(this.#parent);
    }

    renderFilms() {
        const filmsContainer = this.#parent.querySelector(
            '#recommendations-section'
        );
        // const filmsData = await fetchMoviesForStar(this.params.id);

        const filmsData = [
            {
                id: '123',
                title: 'Interstellar',
                preview: preview,
                genres: 'drama',
                year: '2015',
            },
        ];
        filmsData.forEach((film) => {
            const filmElement = document.createElement('div');
            filmsContainer.appendChild(filmElement);
            const filmCard = new FilmCard(filmElement, this.#app);
            filmCard.render(film);
        });
    }
}
export default StarPage;
