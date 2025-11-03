/**
 * @function setupPasswordToggle
 * @description Sets up password visibility toggle for password and confirm password fields.
 * @param {HTMLElement} parent - The parent DOM element containing the form
 */
export function setupPasswordToggle(container) {
    const passwordFields = container.querySelectorAll('.signup__password, .login__password');

    passwordFields.forEach((field) => {
        const input = field.querySelector('input[type="password"]');
        const button = field.querySelector('.signup__eye, .login__eye');
        const eyeOpen = button.querySelector('.signup__eye-icon--open, .login__eye-icon--open');
        const eyeClosed = button.querySelector('.signup__eye-icon--closed, .login__eye-icon--closed');

        if (!input || !button || !eyeOpen || !eyeClosed) return;

        button.addEventListener('click', () => {
            const isPassword = input.type === 'password';

            input.type = isPassword ? 'text' : 'password';

            eyeOpen.style.display = isPassword ? 'none' : 'block';
            eyeClosed.style.display = isPassword ? 'block' : 'none';
        });
    });
}
