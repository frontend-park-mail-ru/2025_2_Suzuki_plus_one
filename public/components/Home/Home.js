export default function Home() {
    const template = Handlebars.templates['Home/Home'];
    const container = document.createElement('div');
    container.innerHTML = template({});
    return container.firstElementChild;
}