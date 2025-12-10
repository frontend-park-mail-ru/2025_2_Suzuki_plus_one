import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function addToFavourite(filmId) {
    return await fetchWithErrorsHandling(`/api/v1/media/${filmId}/like`, {
        method: 'PUT',
    });
}

export async function checkMediaIsLiked(media_id) {
    //     return ({
    //     "liked": false
    // })
    return await fetchWithErrorsHandling(`/api/v1/media/${media_id}/like`, {
        method: 'GET',
    });
}

export async function deleteFromFavourite(media_id) {
    return await fetchWithErrorsHandling(`/api/v1/media/${media_id}/like`, {
        method: 'DELETE',
    });
}

export async function fethcMyFavourite() {
    return await fetchWithErrorsHandling(`/api/v1/media/my?limit=10&offset=0&is_dislike=false`, {
        // return fetchWithErrorsHandling('/api/v1/media/recommendations?type=movie&limit=10', {

        method: 'GET',
    });
}
