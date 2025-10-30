import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';

export async function signOut() {
    try {
        await fetchWithErrorsHandling('/api/v1/auth/signout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { success: true };
    } catch (error) {
        console.error('Sign-out failed:', error);
        return { success: false, error: error.message };
    }
}
