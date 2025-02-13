import React, { useEffect, useState } from "react";
import { fetchHandler, getFavorites, addFavorite } from "../utils/fetchingUtils";
import { useParams } from "react-router-dom";


const ExercisesPage = () => {
    const { muscle } = useParams();
    const [exercises, setExercises] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercises = async () => {
            if (!muscle) {
                setError("No muscle group provided");
                setLoading(false);
                return;
            }

            setLoading(true);
            const [data, err] = await fetchHandler(`/api/exercises/${muscle}`);

            if (err) {
                setError("Failed to fetch exercises");
            } else {
                setExercises(data);
            }
            setLoading(false);
        };

        const fetchUserFavorites = async () => {
            const [data, err] = await getFavorites();
            if (!err && data) {
                setFavorites(data.favorites.map(fav => fav.id));
            }
        };

        fetchExercises();
        fetchUserFavorites();
    }, [muscle]);

    const handleFavorite = async (exerciseId) => {
        const [response, error] = await addFavorite(exerciseId);

        if (!error) {
            setFavorites((prevFavorites) => [...prevFavorites, exerciseId]);
        }
    };

    if (loading) {
        return (
            <div className="exercises-page loading">
                <p>Loading exercises...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="exercises-page">
                <div className="error-container">
                    <h1>Error</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="exercises-page">
            <h1 className="page-title">
                Exercises for <span className="muscle-name">{muscle}</span>
            </h1>
            <div className="exercise-grid">
                {exercises.map((exercise) => (
                    <div key={exercise.id} className="exercise-card">
                        <h2 className="exercise-name">{exercise.name}</h2>
                        <div className="exercise-details">
                            <p><span className="label">Type:</span> {exercise.type}</p>
                            <p><span className="label">Muscle Group:</span> {muscle}</p>
                            <p><span className="label">Equipment:</span> {exercise.equipment}</p>
                            <p><span className="label">Difficulty:</span> {exercise.difficulty}</p>
                        </div>
                        <div className="exercise-instructions">
                            <span className="label">Instructions:</span>
                            <p>{exercise.instructions}</p>
                        </div>
                        <button
                            onClick={() => handleFavorite(exercise.id)}
                            className={`favorite-btn ${favorites.includes(exercise.id) ? 'favorited' : ''}`}
                        >
                            {favorites.includes(exercise.id) ? "❤️" : "🤍"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExercisesPage;