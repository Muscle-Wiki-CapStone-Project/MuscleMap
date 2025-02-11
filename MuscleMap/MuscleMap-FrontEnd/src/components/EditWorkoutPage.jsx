import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkouts, updateWorkout } from '../utils/fetchingUtils';

const EditWorkoutPage = () => {
    const { workoutId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchWorkout = async () => {
            const [workoutData] = await getWorkouts();
            if (workoutData) {
                const workout = workoutData.workouts.find(w => w.id === parseInt(workoutId));
                if (workout) {
                    setTitle(workout.title);
                    setDescription(workout.description);
                }
            }
        };

        fetchWorkout();
    }, [workoutId]);

    const handleUpdateWorkout = async () => {
        const [response, error] = await updateWorkout(workoutId, title, description);
        if (!error) {
            navigate('/profile');
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