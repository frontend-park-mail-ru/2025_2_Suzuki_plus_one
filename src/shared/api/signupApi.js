import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';

export async function signup(data) {
    return fetchWithErrorsHandling('/api/v1/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

export async function submitSignupForm(data) {
    await signup(data);
}
