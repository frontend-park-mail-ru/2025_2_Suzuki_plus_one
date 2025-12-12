import { getAccessToken } from '@shared/utils/auth.js';

export async function createNewPayment(data = {}) {
    const token = getAccessToken();

    // if (!token) {
    //     throw new Error('No access token');
    // }

    const {response} = await(await fetch('/api/v1/payment/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: 'include',
        redirect: 'manual',
    })).json();
    window.location.href = response;

    // const location = response.headers.get('Location') || response.headers.get('location');

    // if (location) {
    //     window.location.href = location;
    //     return;
    // }

    // let errorMessage = 'Redirect URL not found';
    // let errorData = null;

    // try {
    //     errorData = await response.json();
    //     errorMessage = errorData.message || errorMessage;
    // } catch {    
    //     throw new Error(errorMessage);
    // }


}