import React, { useState, useEffect } from 'react';
import { fetchExercises } from '../utils/fetchingUtils';

const ExercisesPage = ({ muscle }) => {
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadExercises = async () => {
            const [data, err] = await fetchExercises(muscle);
            if (err) {
                setError(`Failed to fetch exercises for ${muscle}.`);
            } else {
                setExercises(data);
            }
        };

        loadExercises();
    }, [muscle]);

    if (error) return <div>{error}</div>;
    if (!exercises.length) return <div>Loading exercises...</div>;

    return (
        <div>
            <h2>Exercises for {muscle}</h2>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.id}>
                        <h3>{exercise.name}</h3>
                        <p>{exercise.description}</p>
                        <p>Equipment: {exercise.equipment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExercisesPage;
