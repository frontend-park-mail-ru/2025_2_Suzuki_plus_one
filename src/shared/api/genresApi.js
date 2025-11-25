import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function fetchGenres() {
    return await fetchWithErrorsHandling('/api/v1/genre/all', {
        method: 'GET',
    });
}

export async function fetchMoviesByGenreId(genreId) {
    return await fetchWithErrorsHandling(`/api/v1/genre/${genreId}?media_limit=10`, {
        method: 'GET',
    });
}
