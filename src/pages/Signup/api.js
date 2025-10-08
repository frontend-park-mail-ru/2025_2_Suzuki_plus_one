/**
 * @function submitSignupForm
 * @description Submits the signup form data to the API and handles the response.
 * @param {Object} data - The signup data { username, email, password }
 * @param {Object} appInstance - The main application instance for state management
 * @param {Object} errorDivs - Object containing error div elements for displaying errors
 * @returns {Promise<void>}
 */
export async function submitSignupForm(data, appInstance, errorDivs) {
  try {
    const response = await fetch('/api/v1/auth/signup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = 'An error occurred';
      if (response.status === 400) errorMessage = 'Invalid input';
      else if (response.status === 409) errorMessage = 'User already exists';
      else if (response.status === 500) errorMessage = 'Internal server error';
      errorDivs.passwordErrorDiv.textContent = errorMessage;
      throw new Error(errorMessage);
    }
    appInstance.loginUser();
  } catch (error) {
    errorDivs.confirmErrorDiv.textContent = error.message;
  }
}