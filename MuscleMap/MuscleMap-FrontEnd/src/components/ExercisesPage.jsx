import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchHandler } from "../utils/fetchingUtils";
import { addFavorite, removeFavorite, getFavorites } from "../utils/fetchingUtils";
import Cookies from "js-cookie";

const ExercisesPage = () => {
    const { muscle } = useParams();
    const [exercises, setExercises] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExercisesFromDatabase();
        fetchUserFavorites();
    }, [muscle]);

    // Fetch exercises from the backend
    const fetchExercisesFromDatabase = async () => {
        if (!muscle) {
            setError("No muscle group provided");
            setLoading(false);
            return;
        }

        const [data, err] = await fetchHandler(`/api/exercises/${muscle}`);
        if (err) {
            setError("Failed to load exercises from the database");
        } else {
            setExercises(data);
        }
        setLoading(false);
    };

    // Fetch user's favorite exercises
    const fetchUserFavorites = async () => {
        const sessionId = Cookies.get("session_id");
        if (!sessionId) {
            console.warn("User not logged in. Can't fetch favorites.");
            return;
        }

        const [data, err] = await getFavorites();
        if (!err) {
            setFavorites(new Set(data.favorites));
        }
    };

    // Toggle favorite (add/remove)
    const toggleFavorite = async (exerciseId) => {
        const sessionId = Cookies.get("session_id");
        if (!sessionId) {
            alert("You must be logged in to save favorites!");
            return;
        }

        if (favorites.has(exerciseId)) {
            await removeFavorite(exerciseId);
            setFavorites((prev) => {
                const newFavorites = new Set(prev);
                newFavorites.delete(exerciseId);
                return newFavorites;
            });
        } else {
            await addFavorite(exerciseId);
            setFavorites((prev) => new Set([...prev, exerciseId]));
        }
    };

    if (loading) return <p>Loading exercises...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={pageStyle}>
            <h1 style={headingStyle}>
                Exercises for <span style={{ color: "#3498db", textTransform: "capitalize" }}>{muscle}</span>
            </h1>
            <div style={exerciseGridStyle}>
                {exercises.map((exercise) => (
                    <div key={exercise.id} style={exerciseCardStyle}>
                        <h2 style={exerciseNameStyle}>{exercise.name}</h2>
                        <p style={textStyle}>
                            <span style={labelStyle}>Type:</span> {exercise.type}
                        </p>
                        <p style={textStyle}>
                            <span style={labelStyle}>Muscle Group:</span> {muscle}
                        </p>
                        <p style={textStyle}>
                            <span style={labelStyle}>Equipment:</span> {exercise.equipment}
                        </p>
                        <p style={textStyle}>
                            <span style={labelStyle}>Difficulty:</span> {exercise.difficulty}
                        </p>
                        <p style={instructionsStyle}>
                            <span style={labelStyle}>Instructions:</span>
                            <br />
                            {exercise.instructions}
                        </p>

                        {/* Heart Button for Favorites */}
                        <button
                            onClick={() => toggleFavorite(exercise.id)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "24px",
                                color: favorites.has(exercise.id) ? "red" : "gray",
                            }}
                        >
                            {favorites.has(exercise.id) ? "❤️" : "🤍"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExercisesPage;

// 🔥 Styles
const pageStyle = {
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f0f4f8",
    fontFamily: "Arial, sans-serif",
};

const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
    color: "#2c3e50",
};

const exerciseGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
};

const exerciseCardStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    transition: "transform 0.3s ease",
    position: "relative",
};

const exerciseNameStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#3498db",
};

const labelStyle = {
    fontWeight: "bold",
    color: "#34495e",
};

const textStyle = {
    color: "black",
    marginBottom: "10px",
};

const instructionsStyle = {
    marginTop: "15px",
    lineHeight: "1.6",
    color: "black",
};
