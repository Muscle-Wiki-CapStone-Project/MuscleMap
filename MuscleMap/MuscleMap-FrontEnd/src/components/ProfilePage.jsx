import React, { useEffect, useState } from 'react';
import { fetchProfile, logout, getWorkouts, deleteWorkout } from '../utils/fetchingUtils';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            const [profileData] = await fetchProfile();
            if (profileData) {
                setUser(profileData);
            }
        };

        const loadWorkouts = async () => {
            const [workoutData] = await getWorkouts();
            if (workoutData) {
                setWorkouts(workoutData.workouts);
            }
        };

        loadProfile();
        loadWorkouts();
    }, []);

    const handleDeleteWorkout = async (workoutId) => {
        const [response, error] = await deleteWorkout(workoutId);
        if (!error) {
            setWorkouts(workouts.filter(workout => workout.id !== workoutId)); // ✅ Remove from UI
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <button onClick={logout}>Logout</button>
                    <br />
                    <button onClick={() => navigate('/create-workout')}>Create Workout Routine</button>


                    <h2>Your Workouts</h2>
                    {workouts.length === 0 ? <p>No workouts yet.</p> : (
                        workouts.map((workout) => (
                            <div key={workout.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
                                <h3>{workout.title}</h3>
                                <p>{workout.description}</p>
                                <button onClick={() => navigate(`/edit-workout/${workout.id}`)}>Edit</button>
                                <button onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default ProfilePage;
