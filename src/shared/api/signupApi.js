import { handleHttpError } from '@shared/utils/errorHandler.js'

/**
 * @function submitSignupForm
 * @description Submits the signup form data to the API and handles the response.
 * @param {Object} data - The signup data { username, email, password }
 * @param {Object} appInstance - The main application instance for state management
 * @param {Object} errorDivs - Object containing error div elements for displaying errors
 * @returns {Promise<void>}
 */
export async function submitSignupForm(data, appInstance, errorDivs) {
  const response = await fetch('/api/v1/auth/signup', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  await handleHttpError(response, errorDivs.confirmErrorDiv);
  appInstance.loginUser();
}