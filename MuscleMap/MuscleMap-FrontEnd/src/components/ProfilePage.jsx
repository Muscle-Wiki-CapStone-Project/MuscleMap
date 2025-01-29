import React, { useEffect, useState } from 'react';
import { fetchHandler } from '../utils/fetchingUtils';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const [response, err] = await fetchHandler('/api/profile');
            if (err) {
                setError('Failed to load profile');
            } else {
                setUser(response);
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
        </div>
    );
};

export default ProfilePage;
