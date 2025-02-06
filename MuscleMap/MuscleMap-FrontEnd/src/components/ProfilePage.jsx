import React, { useEffect, useState } from 'react';
import { fetchProfile, logout } from '../utils/fetchingUtils';

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            const [profileData, error] = await fetchProfile();
            if (profileData) {
                setUser(profileData);
            }
        };
        loadProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default ProfilePage;
