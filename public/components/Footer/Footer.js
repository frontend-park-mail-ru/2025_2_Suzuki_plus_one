function Footer() {
    const template = Handlebars.templates['Footer/Footer'];
    const htmlString = template({});
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString;
    return wrapper.firstElementChild;
}

export default Footer;