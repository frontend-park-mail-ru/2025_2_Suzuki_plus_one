class Footer {
    #parent
    constructor(parent) {
        this.#parent = parent
    }
    render() {
        const template = Handlebars.templates['Footer/Footer']
        this.#parent.innerHTML = template({})
    }
}
export default Footer
