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
            setWorkouts(workouts.filter(workout => workout.id !== workoutId));
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profile</h1>
            </div>
            {user ? (
                <div className="profile-content">
                    <div className="user-info">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <div className="profile-actions">
                            <button className="btn btn-logout" onClick={logout}>Logout</button>
                            <button className="btn btn-create" onClick={() => navigate('/create-workout')}>
                                Create Workout Routine
                            </button>
                        </div>
                    </div>

                    <div className="workouts-section">
                        <h2>Your Workouts</h2>
                        {workouts.length === 0 ? (
                            <p className="no-workouts">No workouts yet.</p>
                        ) : (
                            <div className="workouts-grid">
                                {workouts.map((workout) => (
                                    <div key={workout.id} className="workout-card">
                                        <h3>{workout.title}</h3>
                                        {workout.exercises.length > 0 ? (
                                            <ul>
                                                {workout.exercises.map((exercise, index) => (
                                                    <li key={index}>{exercise}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No exercises selected.</p>
                                        )}
                                        <p>{workout.description}</p>
                                        <div className="workout-actions">
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => navigate(`/edit-workout/${workout.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => handleDeleteWorkout(workout.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="loading">Loading profile...</div>
            )}
        </div>
    );
};

export default ProfilePage;
