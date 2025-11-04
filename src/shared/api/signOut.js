import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';
import { clearAccessToken } from '@shared/utils/auth.js';

export async function signOut() {
    try {
        await fetchWithErrorsHandling('/api/v1/auth/signout', {
            method: 'GET',
        });
        clearAccessToken();
        return { success: true };
    } catch (error) {
        console.error('Sign-out failed:', error);
        return { success: false, error: error.message };
    }
}
