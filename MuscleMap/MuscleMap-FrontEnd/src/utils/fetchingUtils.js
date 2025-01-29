const BACKEND_URL = 'http://127.0.0.1:5000';

const basicFetchOptions = {
    method: 'GET',
    credentials: 'include',
};

export const deleteOptions = {
    method: 'DELETE',
    credentials: 'include',
};

export const getPostOptions = (body) => ({
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

export const getPatchOptions = (body) => ({
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

export const fetchHandler = async (url, options = {}) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000${url}`, {
            ...options,
            credentials: 'include',
        });
        const { ok, status, headers } = response;
        if (!ok) throw new Error(`Fetch failed with status - ${status}`);
        const isJson = (headers.get('content-type') || '').includes('application/json');
        const responseData = await (isJson ? response.json() : response.text());
        return [responseData, null];
    } catch (error) {
        console.warn('Error in fetchHandler:', error);
        return [null, error];
    }
};

export const fetchExercises = async (muscle) => {
    // Fetch exercises for specific muscle group from backend API
    const [data, error] = await fetchHandler(`/api/exercises/${muscle}`);
    if (error) {
        console.error(`Error fetching exercises for ${muscle}:`, error);
    }
    return [data, error];
};

export const fetchAndStoreExercises = async (muscle) => {
    const [data, error] = await fetchHandler(`/api/exercises/fetch/${muscle}`);
    if (error) {
        console.error(`Error fetching and storing exercises for ${muscle}:`, error);
    }
    return [data, error];
};