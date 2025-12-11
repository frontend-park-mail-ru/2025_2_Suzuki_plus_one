import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';


export function createNewPayment(data = {}) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/v1/payment/new';
    form.target = '_blank';
    form.style.display = 'none';


    Object.keys(data).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    form.remove();

    return new Promise(() => {});
}