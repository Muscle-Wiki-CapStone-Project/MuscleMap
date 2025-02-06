import Cookies from 'js-cookie';

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

// Generic Fetch Handler
export const fetchHandler = async (url, options = {}) => {
    try {
        console.log(`Fetching from: ${BACKEND_URL}${url}`);
        const response = await fetch(`${BACKEND_URL}${url}`, {
            ...options,
            credentials: 'include', // 🔥 Ensures cookies are sent with requests
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });

        if (!response.ok) throw new Error(`Fetch failed with status - ${response.status}`);

        const isJson = (response.headers.get('content-type') || '').includes('application/json');
        return [await (isJson ? response.json() : response.text()), null];
    } catch (error) {
        console.warn('Error in fetchHandler:', error);
        return [null, error];
    }
};

// 🔥 Authentication Functions

// Signup Function
export const signup = async (username, password, gender) => {
    return fetchHandler('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password, gender }),
    });
};

// Login Function - Stores session in cookies
export const login = async (username, password) => {
    const [data, error] = await fetchHandler('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

    if (!error) {
        // Save session ID to cookie if login is successful
        Cookies.set('session_id', data.session_id, { expires: 7, path: '/' });
    } else {
        console.error('Login failed:', error);
    }

    return [data, error];
};

// Fetch Profile - Sends session ID in request body
export const fetchProfile = async () => {
    const sessionId = Cookies.get('session_id');

    if (!sessionId) {
        console.error('No session found. User not logged in.');
        return [null, new Error('No session found')];
    }

    return fetchHandler('/api/profile', {
        method: 'POST', // Sending session in request body
        body: JSON.stringify({ session_id: sessionId }),
    });
};

// Logout Function - Clears session cookie
export const logout = async () => {
    const [data, error] = await fetchHandler('/api/logout', { method: 'POST' });

    if (!error) {
        Cookies.remove('session_id'); // Remove session from cookies
        window.location.href = '/login'; // Redirect to login
    } else {
        console.error('Logout failed:', error);
    }

    return [data, error];
};


// 🔥 Exercise Fetching Functions
export const fetchExercises = async (muscle) => {
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

// 🔥 Add Exercise to Favorites (Include Session ID)
export const addFavorite = async (exerciseId) => {
    const sessionId = Cookies.get('session_id');
    if (!sessionId) {
        console.error("No session ID found. User is not logged in.");
        return [null, new Error("User not logged in")];
    }

    return fetchHandler('/api/favorites', getPostOptions({ session_id: sessionId, exercise_id: exerciseId }));
};

// ❌ Remove Exercise from Favorites (Include Session ID)
export const removeFavorite = async (exerciseId) => {
    const sessionId = Cookies.get('session_id');
    if (!sessionId) {
        console.error("No session ID found. User is not logged in.");
        return [null, new Error("User not logged in")];
    }

    return fetchHandler(`/api/favorites/${exerciseId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
    });
};

// ❤️ Get User's Favorite Exercises (Include Session ID)
export const getFavorites = async () => {
    const sessionId = Cookies.get('session_id');
    if (!sessionId) {
        console.error("No session ID found. User is not logged in.");
        return [null, new Error("User not logged in")];
    }

    return fetchHandler('/api/favorites', getPostOptions({ session_id: sessionId }));
};
