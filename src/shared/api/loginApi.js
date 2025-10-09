import { handleHttpError } from '@shared/utils/errorHandler.js'
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
export async function login(email, password, errorElement) {
  const response = await fetch('/api/v1/auth/signin', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  await handleHttpError(response, errorElement);
  return response.json();
}

/**
 * @function submitLoginForm
 * @description Submits the login form data to the API and handles the response.
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} appInstance - The main application instance for state management
 * @param {HTMLElement} errorElement - The DOM element to display the error message
 * @returns {Promise<void>}
 */
export async function submitLoginForm(email, password, appInstance, errorElement) {
  await login(email, password, errorElement);
  appInstance.loginUser();
}