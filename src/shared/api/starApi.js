import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

export async function fetchFilm(starId) {
        return await fetchWithErrorsHandling(`/api/v1/star/${starId}`, {
            method: 'GET',
        });
    }