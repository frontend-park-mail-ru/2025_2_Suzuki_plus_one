import './styles/footer.scss'
import template from './ui/Footer.hbs';

class Footer {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = template({});
    }
}

export default Footer;