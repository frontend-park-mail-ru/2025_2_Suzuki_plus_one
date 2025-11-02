import './styles/star-card.scss'
import template from './ui/StarCard.hbs';

class StarCard {
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

export default StarCard;
