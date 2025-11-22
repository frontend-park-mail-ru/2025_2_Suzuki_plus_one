import { fetchWithErrorsHandling } from '@shared/utils/errorHandler';

const DEBOUNCE_DELAY = 300;

let debounceTimer;

export async function search(query, type = 'any', limit = 10, offset = 0) {
    if (!query.trim()) return null;

    const params = new URLSearchParams({
        query: query.trim(),
        type,
        limit: limit.toString(),
        offset: offset.toString(),
    });

    return await fetchWithErrorsHandling(`/api/v1/search?${params}`, {
    // return await fetchWithErrorsHandling(`http://217.16.18.125/api/v1/search?${params}`, {

        method: 'GET',
    });
}

export function debouncedSearch(callback) {
    return (query) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => callback(query), DEBOUNCE_DELAY);
    };
}