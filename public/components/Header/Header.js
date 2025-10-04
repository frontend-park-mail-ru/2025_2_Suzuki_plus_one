/** Class representing the header of the website. */
class Header {
    /** @type {HTMLElement} The parent element where the header will be rendered */
    #parent
    /** @type {Object} The app instance used to check authorization and set pages */
    #app
    /**
     * Creates an instance of Header.
     * @param {HTMLElement} parent -  The parent element to render the header into it.
     * @param {Object} appInstance - The main application instance with authorization and set pages methods.
     * @param {boolean} appInstance.isAuthorized - Indicates if the user is authorized.
     * @param {function} appInstance.setPage - Method to set a different page.
     * @param {function} appInstance.logoutUser - Method to log out the current user.
     */
    constructor(parent, appInstance) {
        this.#parent = parent
        this.#app = appInstance
    }
    /**
     * Renders the header inside the parent element.
     * If user is not logged in renders header with sign in and sign up buttons.
     * If user is logged in renders header with user's profile icon and log out button.
     */
    render() {
        const template = Handlebars.templates['Header/Header']
        this.#parent.innerHTML = template({
            isAuthorized: this.#app.isAuthorized,
        })

        this.#parent
            .querySelector('#homeLink')
            ?.addEventListener('click', (e) => {
                e.preventDefault()
                this.#app.setPage('home')
            })

        if (this.#app.isAuthorized) {
            this.#parent
                .querySelector('#logOutBtn')
                ?.addEventListener('click', async () => {
                    await this.#app.logoutUser()
                })
        } else {
            this.#parent
                .querySelector('#signUpBtn')
                ?.addEventListener('click', () => {
                    this.#app.setPage('signup')
                })

            this.#parent
                .querySelector('#logInBtn')
                ?.addEventListener('click', () => {
                    this.#app.setPage('login')
                })
        }
    }
}
export default Header
