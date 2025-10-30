import './styles/footer.scss'
import template from './ui/Footer.hbs';

/** Class representing the footer of the website.*/
class Footer {
    /** @type {HTMLElement} The parent element where the footer will be rendered. */
    #parent;
    /**
     * Creates an instance of Footer.
     * @param {*} parent
     */
    constructor(parent) {
        this.#parent = parent;
    }
    /**
     * Renders the footer inside the parent element.
     */
    render() {
        // const template = Handlebars.templates['Footer/Footer']
        this.#parent.innerHTML = template({});
    }
}
export default Footer;
