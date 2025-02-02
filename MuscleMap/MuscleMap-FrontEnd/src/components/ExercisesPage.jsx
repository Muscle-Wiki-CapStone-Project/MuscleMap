import React, { useState, useEffect } from 'react';
import { fetchHandler } from '../utils/fetchingUtils';
import { useParams } from 'react-router-dom';

const ExercisesPage = () => {
    const { muscle } = useParams();  // Get muscle from URL if using React Router
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch exercises from the API
    const fetchExercisesFromAPI = async () => {
        if (!muscle) {
            setError('No muscle group provided');
            setLoading(false);
            return;
        }

        setLoading(true);
        const [data, err] = await fetchHandler(`/api/exercises/${muscle}`);  // Fetch from Flask backend
        if (err) {
            setError('Failed to fetch exercises from the external API');
            setLoading(false);
        } else {
            setExercises(data);
            setLoading(false);
        }
    };

    // Fetch exercises from the local database
    const fetchExercisesFromDatabase = async () => {
        if (!muscle) {
            setError('No muscle group provided');
            setLoading(false);
            return;
        }

        const [data, err] = await fetchHandler(`/api/exercises/${muscle}`);  // Local database endpoint
        if (err) {
            setError('Failed to load exercises from the database');
            fetchExercisesFromAPI(); // Fetch from external API if DB fetch fails
        } else {
            setExercises(data);
            setLoading(false);
            if (data.length === 0) {
                fetchExercisesFromAPI(); // If no exercises in DB, fetch from external API
            }
        }
    };

    useEffect(() => {
        if (muscle) {
            fetchExercisesFromDatabase();
        }
    }, [muscle]); // Runs whenever muscle changes

    if (loading) {
        return <div>Loading exercises...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Exercises for {muscle}</h1>
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

export default ExercisesPage;