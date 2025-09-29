class FilmCard {
    #parent
    constructor(parent) {
        this.#parent = parent
    }
    render(data) {
        const template = Handlebars.templates['FilmCard/FilmCard']
        this.#parent.innerHTML = template(data)
    }
}
export default FilmCard
