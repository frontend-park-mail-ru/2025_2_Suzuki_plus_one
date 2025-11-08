import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function fetchTrailer(filmId) {
 //   return fetchWithErrorsHandling(`/api/v1/media/${filmId}`, {
           return await fetchWithErrorsHandling(`/api/v1/media/${filmId}`, {
        method: 'GET',
    });
}
