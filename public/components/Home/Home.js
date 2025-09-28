class Home {
    #parent
    constructor(parent) {
        this.#parent = parent;
    }
    render() {
        const template = Handlebars.templates['Home/Home'];
        this.#parent.innerHTML = template({});
    }
}
export default Home;