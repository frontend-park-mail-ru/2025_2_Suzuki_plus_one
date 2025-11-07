import template from './ui/NotFound.hbs';
import './styles/notfound.scss';

class NotFound {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = template({});
    }
}

export default NotFound;
