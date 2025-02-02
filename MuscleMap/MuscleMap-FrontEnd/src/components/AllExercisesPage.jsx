import React, { useState, useEffect } from 'react';
import { fetchHandler } from '../utils/fetchingUtils';

const AllExercisesPage = () => {
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch all exercises from the backend (which proxies the request to the external API)
    const fetchAllExercises = async () => {
        setLoading(true);
        try {
            const response = await fetchHandler('/api/exercises');  // Call your Flask backend endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch exercises');
            }
            const data = await response.json();
            setExercises(data);  // Store fetched exercises in state
            setLoading(false);
        } catch (error) {
            setError(error.message);  // Handle any errors
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllExercises();  // Fetch all exercises when the component mounts
    }, []);  // This will run once when the component mounts

    if (loading) {
        return <div>Loading exercises...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>All Exercises</h1>
            <ul>
                {exercises.map((exercise, index) => (
                    <li key={index}>
                        <h2>{exercise.name}</h2>
                        <p><strong>Type:</strong> {exercise.type}</p>
                        <p><strong>Muscle Group:</strong> {exercise.muscle}</p>
                        <p><strong>Equipment:</strong> {exercise.equipment}</p>
                        <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
                        <p><strong>Instructions:</strong> {exercise.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllExercisesPage;
