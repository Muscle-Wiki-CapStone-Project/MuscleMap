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
        const response = await fetch(`${BACKEND_URL}${url}`, options); // connect with the backend URL 
        const { ok, status, headers } = response;
        if (!ok) throw new Error(`Fetch failed with status - ${status}`, { cause: status });

        const isJson = (headers.get('content-type') || '').includes('application/json');
        const responseData = await (isJson ? response.json() : response.text());

        return [responseData, null];
    } catch (error) {
        console.warn(error);
        return [null, error];
    }
};