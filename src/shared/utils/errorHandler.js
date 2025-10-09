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

    if (response.status !== 200) {
        const defaultMessages = {
            400: 'Bad Request',
            401: 'Unauthorized',
            404: 'Not Found',
            500: 'Internal server error',
        };
        errorMessage = defaultMessages[response.status] || errorMessage;

        try {
            const data = await response.json();
            if (
                data &&
                typeof data.message === 'string' &&
                data.message.trim()
            ) {
                errorMessage = data.message;
            }
        } catch (e) {}
    }

    if (errorElement) {
        errorElement.textContent = errorMessage;
    }

    throw new Error(errorMessage);
}
