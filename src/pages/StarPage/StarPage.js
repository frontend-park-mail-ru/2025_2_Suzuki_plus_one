import template from './ui/StarPage.hbs';
import star_photo from '@assets/images/star_photo.png';
import { initBiographyToggle } from './showMore.js';
import { fetchStar } from '@shared/api/starApi.js';
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
        try {
            const actor = await fetchStar(this.#starId);
            // const actorData = {
            //     id: 1,
            //     preview: star_photo,
            //     name: 'Matthew McConaughey',
            //     birth_date: 'November 4, 1969',
            //     birth_name: 'Matthew David McConaughey',
            //     bio: `American actor and producer. He first gained notice for his supporting performance in the coming-of-age comedy Dazed and Confused (1993), which was considered by many to be his breakout role. After a number of supporting roles in films including Angels in the Outfield (1994) and Texas Chainsaw Massacre: The Next Generation (1994), his breakthrough performance as a leading man was in the legal drama A Time to Kill (1996).`,
            // };

            const photo =
                actor.image_urls?.length > 0
                    ? actor.image_urls[0]
                    : star_photo;

            this.#parent.innerHTML = template({
                name: actor.name,
                bio: actor.bio,
                photo: photo,
                birth_date: actor.birth_date?.split("T")[0],
            });

            this.afterRender();

            //     this.renderFilms();
        } catch (err) {
            console.error("Actor page error:", err);
            this.#parent.innerHTML = `<h2 style="color:red;text-align:center">Actor not found</h2>`;
        }

    }

    afterRender() {
        initBiographyToggle(this.#parent);
    }
}
export default StarPage;
