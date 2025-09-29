class Header {
    #parent
    constructor(parent, appInstance) {
        this.#parent = parent
        this.app = appInstance
    }
    render() {
        const template = Handlebars.templates['Header/Header']
        this.#parent.innerHTML = template({
            isAuthorized: this.app.isAuthorized,
        })

        this.#parent
            .querySelector('#homeLink')
            ?.addEventListener('click', (e) => {
                e.preventDefault()
                this.app.setPage('home')
            })

        if (this.app.isAuthorized) {
            this.#parent
                .querySelector('#logOutBtn')
                ?.addEventListener('click', () => {
                    this.app.logoutUser()
                })
        } else {
            this.#parent
                .querySelector('#signUpBtn')
                ?.addEventListener('click', () => {
                    this.app.setPage('signup')
                })

            this.#parent
                .querySelector('#logInBtn')
                ?.addEventListener('click', () => {
                    this.app.setPage('login')
                })
        }
    }
}
export default Header
