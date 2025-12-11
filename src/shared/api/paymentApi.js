import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';


export async function createNewPayment(data) {
    return fetchWithErrorsHandling('/api/v1/payment/new', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}