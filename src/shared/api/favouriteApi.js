import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function addToFavourite(filmId) {
    return await fetchWithErrorsHandling(`/api/v1/media/${filmId}/like`, {
        method: 'PUT',
    });
}

export async function checkMediaIsLiked(media_id) {
    return await fetchWithErrorsHandling(`/api/v1/media/${media_id}/like`, {
        method: 'GET',
    });
}

export async function deleteFromFavourite(media_id) {
    return ({
        "liked": true
    })
    // return await fetchWithErrorsHandling(`/api/v1/media/${media_id}/like`, {
    //     method: 'DELETE',
    // });
}

export async function fethcMyFavourite() {
    return await fetchWithErrorsHandling(`/api/v1/media/my`, {
        method: 'GET',
    });
}
