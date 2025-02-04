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
        console.log(`Fetching from: http://127.0.0.1:5000${url}`);
        const response = await fetch(`http://127.0.0.1:5000${url}`, {
            ...options,
            credentials: 'include', // 🔥 Make sure cookies are sent
        });

        if (response.status === 302) {
            // 🔥 Handle redirect manually (Flask redirects when not logged in)
            const redirectUrl = response.headers.get("Location");
            console.warn("Redirecting to:", redirectUrl);
            return fetchHandler(redirectUrl); // Fetch new URL
        }

        if (!response.ok) throw new Error(`Fetch failed with status - ${response.status}`);

        const isJson = (response.headers.get('content-type') || '').includes('application/json');
        return [await (isJson ? response.json() : response.text()), null];
    } catch (error) {
        console.warn('Error in fetchHandler:', error);
        return [null, error];
    }
};

// export const fetchHandler = async (url, options = {}) => {
//     try {
//         console.log('Fetching from:', `${BACKEND_URL}${url}`)
//         const response = await fetch(`${BACKEND_URL}${url}`, {
//             ...options,
//             credentials: 'include',
//         });
//         const { ok, status, headers } = response;
//         if (!ok) throw new Error(`Fetch failed with status - ${status}`);
//         const isJson = (headers.get('content-type') || '').includes('application/json');
//         const responseData = await (isJson ? response.json() : response.text());
//         return [responseData, null];
//     } catch (error) {
//         console.warn('Error in fetchHandler:', error);
//         return [null, error];
//     }
// };

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
// Function to log in the user
// const login = async (username, password) => {
//     const response = await fetch('http://127.0.0.1:5000/api/login', {
//         method: 'POST', // Correct method to log in
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }), // Sending user credentials in the request body
//         credentials: 'include', // To send the session cookie along with the request
//     });

//     if (!response.ok) {
//         throw new Error('Login failed');
//     }

//     return response.json(); // Return the login success response
// };

// // Function to fetch profile after login
// const fetchProfile = async () => {
//     try {
//         // Login the user first (make sure to call this with actual username/password)
//         await login('user', 'password'); // Example credentials for login

//         // After login, fetch the profile
//         const response = await fetch('http://127.0.0.1:5000/api/profile', {
//             method: 'GET',
//             credentials: 'include', // Ensure session cookies are sent with the request
//         });

//         if (!response.ok) {
//             throw new Error('Failed to load profile');
//         }

//         const user = await response.json(); // Assuming the response contains user data
//         console.log(user); // You can use this user data to update the state
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };
