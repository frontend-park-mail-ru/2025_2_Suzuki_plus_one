let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
    accessToken = null;
};

export const isTokenValid = () => {
    if (!accessToken) return false;
    try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    } catch {
        return false;
    }
};

export const refreshAccessToken = async () => {
    try {
        const response = await fetch('/api/v1/auth/refresh', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) throw new Error('Refresh failed');

        const { access_token } = await response.json();
        setAccessToken(access_token);
        return access_token;
    } catch (err) {
        clearAccessToken();
        throw err;
    }
};