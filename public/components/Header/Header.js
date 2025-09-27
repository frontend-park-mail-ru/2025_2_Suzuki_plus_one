export default function Header() {
    const template = Handlebars.templates['Header/Header'];
    const container = document.createElement('div');
    container.innerHTML = template({});

    container.querySelector('#signUpBtn')?.addEventListener('click', () => window.globalReact.setPage('signup'));
    container.querySelector('#signInBtn')?.addEventListener('click', () => window.globalReact.setPage('login'));
    container.querySelector('#homeLink')?.addEventListener('click', () => window.globalReact.setPage('home'));

    return container.firstElementChild;
}