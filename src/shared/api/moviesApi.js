/**
 * @module moviesApi
 * @description Provides API calls for movie-related data
 */

/**
 * Fetches the list of movies from the API
 * @returns {Promise<Array<Object>>} Array of movie objects or throws an error
 */
export async function fetchMovies() {
    const response = await fetch('/api/v1/movies', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(
            (await response.text()) || `HTTP error. status: ${response.status}`
        );
    }

    return response.json();
}
