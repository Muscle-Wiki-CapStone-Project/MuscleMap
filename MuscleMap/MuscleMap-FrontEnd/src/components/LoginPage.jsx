import React, { useState } from 'react';
import { fetchHandler, getPostOptions } from '../utils/fetchingUtils';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = { username, password };

        const [response, err] = await fetchHandler('/api/login', getPostOptions(body)); // Ensure POST method

        if (err) {
            setError('Invalid username or password.');
        } else {
            setMessage('Login successful!');
            window.location.href = '/profile'; // Redirect after login
        }
    };


    return (
        <div>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
