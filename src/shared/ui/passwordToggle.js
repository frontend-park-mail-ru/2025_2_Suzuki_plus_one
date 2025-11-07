/**
 * @function setupPasswordToggle
 * @description Sets up password visibility toggle for ANY password field with .__password and .__eye
 * @param {HTMLElement} container - The parent DOM element containing the form
 */
export function setupPasswordToggle(container) {
    const passwordFields = container.querySelectorAll('[class*="__password"]');

    passwordFields.forEach((field) => {
        const input = field.querySelector('input[type="password"], input[type="text"]');
        const button = field.querySelector('[class*="__eye"]');
        const eyeOpen = button?.querySelector('[class*="--open"]');
        const eyeClosed = button?.querySelector('[class*="--closed"]');

        if (!input || !button || !eyeOpen || !eyeClosed) return;

        button.addEventListener('click', () => {
            const isPassword = input.type === 'password';

            input.type = isPassword ? 'text' : 'password';

            eyeOpen.style.display = isPassword ? 'none' : 'block';
            eyeClosed.style.display = isPassword ? 'block' : 'none';
        });
    });
}