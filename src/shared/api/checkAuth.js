import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';

export async function checkAuth() {
    try {
        const data = await fetchWithErrorsHandling('/api/v1/auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            isAuthorized: true,
            user: data.user,
        };
    } catch (err) {
        return { isAuthorized: false, user: null };
    }
}
