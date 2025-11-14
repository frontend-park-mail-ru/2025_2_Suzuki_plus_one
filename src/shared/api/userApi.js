import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';

export async function getUserInfo() {
    return fetchWithErrorsHandling('/api/v1/user/me', {
        method: 'GET',
    });
}

export async function updateUserProfile(data) {
    return fetchWithErrorsHandling('/api/v1/user/me/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

export async function uploadUserAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    return fetchWithErrorsHandling('/api/v1/user/me/update/avatar', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
        body: formData,
    });
}

export async function updateUserPassword({ current_password, new_password }) {
    return fetchWithErrorsHandling('/api/v1/user/me/update/password', {
        method: 'POST',
        body: JSON.stringify({
            current_password,
            new_password,
        }),
    });
}