export async function createNewPayment(data = {}) {
    const token = getAccessToken();
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch('/api/v1/payment/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders,
        },
        body: JSON.stringify(data),
        credentials: 'include',
        redirect: 'follow',
    });

    const location = response.headers.get('Location') || response.headers.get('location');

    if (location) {
        const redirectUrl = new URL(location, window.location.origin).href;
        window.location.href = redirectUrl;
        return;
    }


    if (response.ok) {
        const json = await response.json();
        if (json.redirect_url) {
            window.location.href = json.redirect_url;
            return;
        }
    }

    let errorMessage = 'Redirect URL not found';
    try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
}