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

        this.#parent
            .querySelector('#starPageLink')
            ?.addEventListener('click', (e) => {
                e.preventDefault();
                this.#app.setPage('starPage');
            });
    }
}
export default StarCard;
