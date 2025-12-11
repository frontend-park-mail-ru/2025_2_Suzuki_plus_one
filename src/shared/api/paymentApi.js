import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';


export async function createNewPayment(data = {}) {
    const response = await fetchWithErrorsHandling('/api/v1/payment/new', {
        method: 'POST',
        body: JSON.stringify(data),

    });

    // if (response.redirected && response.url) {
    //     return response.url;
    // }

    const location = response.headers.get('Location') || response.headers.get('location');
    if (location) {
        return new URL(location, window.location.origin).href;
    }

    throw new Error('Redirect URL not found in payment response');
}