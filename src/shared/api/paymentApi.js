import { getAccessToken } from '@shared/utils/auth.js';

export async function createNewPayment(data = {}) {
    const token = getAccessToken();

    if (!token) {
        throw new Error('No access token');
    }

    const response = await fetch('/api/v1/payment/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: 'include',
        redirect: 'manual',
    });

    console.log("resp", response)
    const json = await response.json();
    console.log("json", json)

    if (response.status === 200) {
        try {
            const redirectUrl = json?.redirectUrl || json?.redirect_url;
            if (redirectUrl) {
                window.location.href = redirectUrl;
                return;
            } else {
                throw new Error('Redirect URL not found');
            }
        } catch (e) {
            // ignore parse errors and continue to error handling below
            console.error("Error parsing JSON response:", e);
        }
    }

    // const location = response.headers.get('Location') || response.headers.get('location');
    
    // console.log("locations: ", location)
    
    // if (location) {
    //     window.location.href = location;
    //     return;
    // }

    let errorMessage = 'Redirect URL not found';
    let errorData = null;

    try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
    } catch {
    }

    throw new Error(errorMessage);
}