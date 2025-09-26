import React from '../../js/react.js'; // Если нужно createElement внутри
function Home() {
    const template = Handlebars.templates['Home/Home'];
    const htmlString = template({});
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString;
    const homeElement = wrapper.firstElementChild;

    return homeElement;
}

export default Home;