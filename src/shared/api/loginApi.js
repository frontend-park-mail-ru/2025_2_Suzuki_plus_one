import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';
/**
 * @module loginApi
 * @description Provides API calls for authentication
 */

/**
 * Performs a login request to the authentication endpoint
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {HTMLElement} errorElement - The DOM element to display the error message
 * @returns {Promise<Object>} Response data
 */
export async function login(email, password) {
    return fetchWithErrorsHandling('/api/v1/auth/signin', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
}

/**
 * @function submitLoginForm
 * @description Submits the login form data to the API and handles the response.
 * @param {string} email - User email
 * @param {string} password - User password
 */
export async function submitLoginForm(email, password) {
    await login(email, password);
}
