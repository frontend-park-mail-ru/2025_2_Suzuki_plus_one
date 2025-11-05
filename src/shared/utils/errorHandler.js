import statuses from 'statuses';
import { getAccessToken, setAccessToken, clearAccessToken } from './auth.js';

const API_BASE = '/api/v1';
// const API_BASE = 'http://217.16.18.125/api/v1';

export class HttpError extends Error {
    constructor(status, message, data = null) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.data = data;
    }
}

export async function handleHttpError(response) {
    let data = null;
    try {
        data = await response.json();
    } catch (e) {
        data = null;
    }

    if (!response.ok) {
        const message = data?.message || statuses[response.status];
        console.log(message);
        throw new HttpError(response.status, message, data);
    }

    return data;
}

export async function fetchWithErrorsHandling(url, options = {}) {
    const token = getAccessToken();
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const finalOptions = {
        ...options,
        headers: {
            ...authHeaders,
            ...options.headers,
            ...(options.headers?.['Content-Type'] ? {} : { 'Content-Type': 'application/json' }),
        },
        credentials: 'include',
    };

    try {
        const response = await fetch(url, finalOptions);
        const data = await handleHttpError(response);

        if (data?.accessToken) {
            setAccessToken(data.access_token);
        }

        return data;
    } catch (err) {
        if (err instanceof HttpError && err.status === 401 && token) {
            try {
                const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!refreshResponse.ok) throw new Error('Refresh failed');

                const refreshData = await refreshResponse.json();
                const newToken = refreshData.access_token;

                if (!newToken) throw new Error('No access token in refresh');

                setAccessToken(newToken);

                const retryOptions = {
                    ...finalOptions,
                    headers: {
                        ...finalOptions.headers,
                        Authorization: `Bearer ${newToken}`,
                    },
                };

                const retryResponse = await fetch(url, retryOptions);
                return await handleHttpError(retryResponse);
            } catch (refreshErr) {
                clearAccessToken();
                throw err;
            }
        }

        if (err instanceof TypeError) {
            throw new HttpError(0, 'Network error: could not reach server');
        }

        throw err;
    }
}