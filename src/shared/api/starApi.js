import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function fetchStar(starId) {
    // return await fetchWithErrorsHandling(`http://217.16.18.125/api/v1/actor/${starId}`, {
        return await fetchWithErrorsHandling(`/api/v1/actor/${starId}`, {
            method: 'GET',
        });
    }