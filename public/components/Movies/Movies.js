function Movies() {
    // Тестовые данные (потом fetch('/api/movies'))
    const filmsData = [
        { title: 'Фильм 1', description: 'Описание фильма 1', poster: '' },
        { title: 'Фильм 2', description: 'Описание фильма 2', poster: '' },
    ];

    const template = Handlebars.templates['Movies/Movies'];
    const htmlString = template({ films: filmsData }); 
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString;
    const moviesElement = wrapper.firstElementChild;

    const buttons = moviesElement.querySelectorAll('.watch-btn');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            console.log('Смотреть фильм:', filmsData[index].title);
            alert(`Воспроизведение ${filmsData[index].title} (тест)`);
        });
    });

    return moviesElement;
}

export default Movies;