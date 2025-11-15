import template from './ui/supportItem.hbs';

class SupportItem {
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

export default SupportItem;
