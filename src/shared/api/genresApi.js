import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function fetchGenres() {
    return await fetchWithErrorsHandling('/api/v1/genre/all', {
        method: 'GET',
    });
}

export async function fetchMoviesByGenreId(genreIds) {
    return await fetchWithErrorsHandling(
        `/api/v1/media/recommendations?type=movie&limit=10&genre_ids=${genreIds}`,
        {
            method: 'GET',
        },
    );
}
