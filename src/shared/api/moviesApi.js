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
    return fetchWithErrorsHandling('/api/v1/media/recommendations?type=movie&limit=2', {
//    return fetchWithErrorsHandling('http://217.16.18.125/api/v1/media/recommendations?type=movie&limit=2', {
        method: 'GET',
    });
}

export async function fetchFilm(filmId) {
    return await fetchWithErrorsHandling(`/api/v1/media/${filmId}`, {
//           return await fetchWithErrorsHandling(`http://217.16.18.125/api/v1/media/${filmId}`, {
        method: 'GET',
    });
}

export async function fetchStarsByFilmId(filmId) {
    return await fetchWithErrorsHandling(`/api/v1/media/${filmId}/actor`, {
 //          return await fetchWithErrorsHandling(`http://217.16.18.125/api/v1/media/${filmId}/actor`, {
        method: 'GET',
    });
}