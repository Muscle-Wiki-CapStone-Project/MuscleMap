import React, { useState, useEffect } from 'react';
import { getFavorites, createWorkout } from '../utils/fetchingUtils';
import { useNavigate } from 'react-router-dom';


const CreateWorkoutPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const [favData] = await getFavorites();
            if (favData) setFavorites(favData.favorites);
        };
        fetchFavorites();
    }, []);

    const handleCreateWorkout = async () => {
        const [response, error] = await createWorkout(title, selectedExercises, description);
        if (!error) {
            navigate('/profile');
        } else {
            console.error("Failed to create workout:", error);
        }
    };

    const toggleExercise = (exerciseId) => {
        setSelectedExercises(prev =>
            prev.includes(exerciseId)
                ? prev.filter(id => id !== exerciseId)
                : [...prev, exerciseId]
        );
    };

    return (
        <div className="workout-page">
            <div className="workout-container">
                <h1 className="workout-title">Create Workout Routine</h1>
                <div className="workout-form">
                    <div className="form-group">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Routine Title"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="form-textarea"
                        />
                    </div>
                    <div className="exercise-selection">
                        <h3 className="section-title">Select Exercises from Favorites</h3>
                        <div className="exercise-list">
                            {favorites.map(ex => (
                                <div key={ex.id} className="exercise-item">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedExercises.includes(ex.id)}
                                            onChange={() => toggleExercise(ex.id)}
                                            className="checkbox-input"
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span className="exercise-name">{ex.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="button-group">
                        <button onClick={handleCreateWorkout} className="btn btn-primary">
                            Save Routine
                        </button>
                        <button onClick={() => navigate('/profile')} className="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateWorkoutPage;