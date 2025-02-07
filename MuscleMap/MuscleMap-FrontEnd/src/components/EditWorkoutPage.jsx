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
            navigate('/profile'); // ✅ Redirect back to profile
        }
    };

    return (
        <div>
            <h1>Edit Workout Routine</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Routine Title" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <button onClick={handleUpdateWorkout}>Save Changes</button>
            <br />
            <button onClick={() => navigate('/profile')}>Cancel</button>
        </div>
    );
};

export default EditWorkoutPage;
