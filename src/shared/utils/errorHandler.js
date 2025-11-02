import statuses from 'statuses';

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

export async function fetchWithErrorsHandling(url, options) {
    try {
        const response = await fetch(url, options);
        return await handleHttpError(response);
    } catch (err) {
        if (err instanceof TypeError) {
            throw new HttpError(0, 'Network error: could not reach server');
        }
        throw err;
    }
}
