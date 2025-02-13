import React, { useState } from 'react';
import { getPostOptions, fetchHandler } from '../utils/fetchingUtils';
import { useNavigate } from 'react-router-dom';

const UserSignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('Male');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = { username, password, gender };
        const [data, err] = await fetchHandler('/api/signup', getPostOptions(body));

        if (err) {
            setError('An error occurred during registration.');
        } else {
            setMessage(data.message);

    
            setTimeout(() => {
                navigate('/login');
            }, 2000); 
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Sign Up</h1>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-auth">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default UserSignUp;
