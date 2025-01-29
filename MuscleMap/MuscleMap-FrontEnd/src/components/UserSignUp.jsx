import React, { useState } from 'react';
import { getPostOptions, fetchHandler } from '../utils/fetchingUtils';

const UserSignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('Male');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = { username, password, gender };

        const [data, err] = await fetchHandler('/api/signup', getPostOptions(body));

        if (err) {
            setError('An error occurred during registration.');
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
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
                <div>
                    <label>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default UserSignUp;
