/**
 * @module moviesApi
 * @description Provides API calls for movie-related data
 */

import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

/**
 * Fetches the list of movies from the API
 * @returns {Promise<Array<Object>>} Array of movie objects
 */
export async function fetchMovies() {
    return fetchWithErrorsHandling('/api/v1/movies', {
        method: 'GET',
    });
}
