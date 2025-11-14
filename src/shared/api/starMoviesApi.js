import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function fetchStarMovies(starId) {
    return fetchWithErrorsHandling(`/api/v1/actor/${starId}/media`, {
        method: 'GET',
    });
}