export async function createNewPayment(data = {}) {
    const response = await fetch('/api/v1/payment/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
        redirect: 'manual',
    });

    if (response.type === 'opaqueredirect' || response.status === 302 || response.status === 303) {
        const location = response.headers.get('Location') || response.headers.get('location');
        if (location) {
            return new URL(location, window.location.origin).href;
        }
    }

    if (response.ok) {
        const json = await response.json();
        if (json.redirect_url || json.payment_url || json.url) {
            return json.redirect_url || json.payment_url || json.url;
        }
    }

    throw new Error('Failed to get payment redirect URL');
}