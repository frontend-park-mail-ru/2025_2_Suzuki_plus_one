/**
 * @module errorHandler
 * @description Provides utility functions for handling HTTP errors
 */

/**
 * Handles HTTP errors and updates the error display
 * @param {Response} response - The fetch response object
 * @param {HTMLElement} errorElement - The DOM element to display the error message
 * @returns {void} Updates the error element or throws an error
 */
export async function handleHttpError(response, errorElement) {
    let errorMessage = 'An error occurred';

    if (response.status === 400) {
        errorMessage = 'Bad Request';
    } else if (response.status === 401) {
        errorMessage = 'Unauthorized';
    } else if (response.status === 404) {
        errorMessage = 'Not Found';
    } else if (response.status === 500) {
        errorMessage = 'Internal server error';
    } else {
        errorMessage = (await response.text()) || errorMessage;
    }

    if (errorElement) {
        errorElement.textContent = errorMessage;
    }

    throw new Error(errorMessage);
}
