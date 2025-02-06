import React, { useEffect, useState } from "react";
import { fetchHandler, getFavorites, addFavorite } from "../utils/fetchingUtils";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ExercisesPage = () => {
    const { muscle } = useParams();
    const [exercises, setExercises] = useState([]);
    const [favorites, setFavorites] = useState([]); // Store user's favorited exercises
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
                setFavorites(data.favorites.map(fav => fav.id)); // 🔥 Only store exercise IDs
                console.log("Fetched favorites:", data.favorites);
            }
        };

        fetchExercises();
        fetchUserFavorites(); // 🔥 Fetch favorites when page loads
    }, [muscle]);

    // ❤️ Handle Favoriting an Exercise
    const handleFavorite = async (exerciseId) => {
        const [response, error] = await addFavorite(exerciseId);

        if (!error) {
            setFavorites((prevFavorites) => [...prevFavorites, exerciseId]); // 🔥 Update UI instantly
            console.log("Exercise favorited:", exerciseId);
        }
    };

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

    if (loading) {
        return (
            <div style={{ ...pageStyle, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <p>Loading exercises...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ ...pageStyle, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                    }}
                >
                    <h1 style={{ color: "#e74c3c", fontSize: "1.5rem", marginBottom: "10px" }}>Error</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

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
                        {/* 💖 Favorite Button */}
                        <button
                            onClick={() => handleFavorite(exercise.id)}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "24px",
                                color: favorites.includes(exercise.id) ? "red" : "gray",
                            }}
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
