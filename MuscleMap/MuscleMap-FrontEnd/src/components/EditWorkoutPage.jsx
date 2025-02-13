import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkouts, updateWorkout, getFavorites } from '../utils/fetchingUtils';

const EditWorkoutPage = () => {
    const { workoutId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    useEffect(() => {
        const fetchWorkout = async () => {
            const [workoutData] = await getWorkouts();
            if (workoutData) {
                const workout = workoutData.workouts.find(w => w.id === parseInt(workoutId));
                if (workout) {
                    setTitle(workout.title);
                    setDescription(workout.description);
                    setSelectedExercises(workout.exercises.map(ex => ex.id)); // ✅ Load existing exercises
                }
            }
        };

        const fetchFavorites = async () => {
            const [favData] = await getFavorites();
            if (favData) setFavorites(favData.favorites); // ✅ Load available favorite exercises
        };

        fetchWorkout();
        fetchFavorites();
    }, [workoutId]);

    // ✅ Handle adding/removing exercises
    const toggleExercise = (exerciseId) => {
        setSelectedExercises((prev) =>
            prev.includes(exerciseId) ? prev.filter(id => id !== exerciseId) : [...prev, exerciseId]
        );
    };

    const handleUpdateWorkout = async () => {
        const [response, error] = await updateWorkout(workoutId, title, description, selectedExercises);
        if (!error) {
            navigate('/profile'); // ✅ Redirect to profile after updating
        }
    };

    return (
        <div className="workout-page">
            <div className="workout-container">
                <h1 className="workout-title">Edit Workout Routine</h1>
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
                        <h3 className="section-title">Edit Selected Exercises</h3>
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
                        <button onClick={handleUpdateWorkout} className="btn btn-primary">
                            Save Changes
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

export default EditWorkoutPage;
