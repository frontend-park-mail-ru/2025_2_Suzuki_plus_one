import { getAccessToken } from './auth.js';

export async function createNewPayment(data = {}) {
    const token = getAccessToken();

    if (!token) {
        throw new Error('No token');
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/v1/payment/new';
    form.style.display = 'none';

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');


    const response = await fetch('/api/v1/payment/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        redirect: 'manual',
    });

    if (response.status === 303) {

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/api/v1/payment/new';
        form.style.display = 'none';

        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'access_token';
        tokenInput.value = token;
        form.appendChild(tokenInput);

        document.body.appendChild(form);
        form.submit();
    }
}