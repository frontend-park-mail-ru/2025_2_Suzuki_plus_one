/**
 * @module moviesApi
 * @description Provides API calls for movie-related data
 */

import { handleHttpError } from '@shared/utils/errorHandler';

/**
 * Fetches the list of movies from the API
 * @returns {Promise<Array<Object>>} Array of movie objects
 */
export async function fetchMovies() {
    const response = await fetch('/api/v1/movies', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    await handleHttpError(response, null);
    return response.json();
}