function Header() {
    // This works only with precompiled js templates
    const template = Handlebars.templates['Header/Header']
    const htmlString = template({}) // Compile the template into an HTML string

    // Create a wrapper element and set its innerHTML
    const wrapper = document.createElement('div')
    wrapper.innerHTML = htmlString

    // Return the first child of the wrapper (the actual DOM element)
    return wrapper.firstElementChild
}

export default Header
