export function initBiographyToggle(parent) {
    document.querySelectorAll('.description__button').forEach(button => {
        button.addEventListener('click', () => {
            const text = button.previousElementSibling;
            const btnText = button.querySelector('.description__button-text');
            text.classList.toggle('description__text--expanded');

            if (text.classList.contains('description__text--expanded')) {
                btnText.textContent = 'Show less ∧';
            } else {
                btnText.textContent = 'Show more ∨';
            }
        });
    });
}