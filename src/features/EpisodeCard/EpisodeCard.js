import './styles/episode-card.scss';
import template from './ui/EpisodeCard.hbs';

class EpisodeCard {
    #parent;
    #app;

    constructor(parent, appInstance) {
        this.#parent = parent;
        this.#app = appInstance;
    }

    render(data) {
        this.#parent.innerHTML = template(data);
    }
}

export default EpisodeCard;
