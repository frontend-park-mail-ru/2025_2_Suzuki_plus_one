import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';

export async function checkAuth() {
    try {
        const data = await fetchWithErrorsHandling('/api/v1/auth', {
            method: 'GET',
        });

        return { isAuthorized: true, user: data.user };
    } catch (err) {
        return { isAuthorized: false, user: null };
    }
}
