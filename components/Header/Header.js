
class Header {
    // #parent
    constructor() {
        this.el = document.querySelector("#header");
        // this.#parent = parent;
    }

    render() {
        const template = Handlebars.templates['Header.hbs'];
        console.log("header");
        this.el.innerHTML = template({});
    }
}
export default Header;