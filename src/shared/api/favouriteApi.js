import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function addToFavourite(filmId) {
    return await fetchWithErrorsHandling(`/api/v1/media/${filmId}/like`, {
        method: 'PUT',
    });
}
