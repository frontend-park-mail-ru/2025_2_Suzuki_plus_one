import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';

export async function fetchAllAppeals() {
    return await fetchWithErrorsHandling(`/api/v1/appeal/all`, {
        method: 'GET',
    });
}

export async function fetchMyAppeals() {
    return await fetchWithErrorsHandling(`/api/v1/appeal/my`, {
        method: 'GET',
    });
}

export async function createNewAppeal(data) {
    return fetchWithErrorsHandling('/api/v1/appeal/new', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function fetchAppealById(appeal_id) {
    return await fetchWithErrorsHandling(`/api/v1/appeal/{appeal_id}`, {
        method: 'GET',
    });
}

export async function markAppealAsResolved(data) {
    return fetchWithErrorsHandling('/api/v1/appeal/{appeal_id}/resolve', {
        method: 'PUT',
        // body: JSON.stringify(data),
    });
}

export async function createNewAppeal(data) {
    return fetchWithErrorsHandling('/api/v1/appeal/{appeal_id}/message', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function createNewAppeal() {
    return fetchWithErrorsHandling('/api/v1/appeal/{appeal_id}/message', {
        method: 'GET',
    });
}