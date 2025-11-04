export function initFilmRecommendations() {
    const list = document.querySelector('.films-recommendations__list');
    const btnLeft = document.querySelector('.films-recommendations__button--left');
    const btnRight = document.querySelector('.films-recommendations__button--right');
    
    if (!list || !btnLeft || !btnRight) {
        console.warn('Film recommendations elements not found');
        return;
    }

    function updateButtons() {
        const scrollLeft = list.scrollLeft;
        const maxScrollLeft = list.scrollWidth - list.clientWidth;

        btnLeft.style.display = scrollLeft <= 0 ? 'none' : 'flex';
        btnRight.style.display = scrollLeft >= maxScrollLeft - 5 ? 'none' : 'flex';
    }

    btnLeft.addEventListener('click', () => {
        list.scrollBy({ left: -300, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        list.scrollBy({ left: 300, behavior: 'smooth' });
    });

    list.addEventListener('scroll', updateButtons);
    updateButtons();

    return updateButtons;
}

export default initFilmRecommendations;