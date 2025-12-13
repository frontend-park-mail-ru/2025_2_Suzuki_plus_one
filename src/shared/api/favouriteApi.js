import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function setMediaReaction(media_id, type) {
    return await fetchWithErrorsHandling(`/api/v1/media/${media_id}/like?type=${type}`, {
        method: 'PUT',
    });
}

export async function removeMediaReaction(media_id) {
    return await fetchWithErrorsHandling(`/api/v1/media/${media_id}/like`, {
        method: 'DELETE',
    });
}

export async function checkMediaReaction(media_id) {
    return await fetchWithErrorsHandling(`/api/v1/media/${media_id}/like`, {
        method: 'GET',
    });
}

export async function fetchMyFavourite() {
    return await fetchWithErrorsHandling(`/api/v1/media/my?limit=10&offset=0&is_dislike=false`, {
        method: 'GET',
    });
}