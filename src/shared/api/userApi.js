import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';

export async function getUserInfo() {
    return fetchWithErrorsHandling('/api/v1/user/me', {
        method: 'GET',
    });
}

export async function setUserInfo() {
    return fetchWithErrorsHandling('/api/v1/user/me/update', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function setUserAvatar() {
    return fetchWithErrorsHandling('/api/v1/user/me/update/avatar', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function setUserPassword() {
    return fetchWithErrorsHandling('/api/v1/user/me/update/password', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}