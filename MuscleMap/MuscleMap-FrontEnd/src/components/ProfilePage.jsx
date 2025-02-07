import React, { useState, useEffect } from 'react';
import { fetchProfile, logout, getFavorites, createWorkout, getWorkouts, deleteWorkout } from '../utils/fetchingUtils';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);

    useEffect(() => {
        const loadProfile = async () => {
            const [profileData] = await fetchProfile();
            if (profileData) setUser(profileData);

            const [favData] = await getFavorites();
            if (favData) setFavorites(favData.favorites);

            const [workoutData] = await getWorkouts();
            if (workoutData) setWorkouts(workoutData.workouts);
        };
        loadProfile();
    }, []);

    const handleCreateWorkout = async () => {
        const [response, error] = await createWorkout(title, selectedExercises, description);
        if (!error) {
            setShowForm(false);
            setWorkouts([...workouts, { title, description }]);
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            {user && <p>Welcome, {user.username}</p>}
            <button onClick={() => setShowForm(true)}>Create Workout Routine</button>

            {showForm && (
                <div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Routine Title" />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                    {favorites.map(ex => (
                        <div key={ex.id}>
                            <input type="checkbox" value={ex.id} onChange={() => setSelectedExercises([...selectedExercises, ex.id])} />
                            {ex.name}
                        </div>
                    ))}
                    <button onClick={handleCreateWorkout}>Save Routine</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
