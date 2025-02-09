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
            navigate('/profile'); // ✅ Redirect back to profile after creation
        } else {
            console.error("Failed to create workout:", error);
        }
    };

    return (
        <div>
            <h1>Create Workout Routine</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Routine Title" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <h3>Select Exercises from Favorites:</h3>
            {favorites.map(ex => (
                <div key={ex.id}>
                    <input 
                        type="checkbox" 
                        value={ex.id} 
                        onChange={() => setSelectedExercises([...selectedExercises, ex.id])} 
                    />
                    {ex.name}
                </div>
            ))}
            <button onClick={handleCreateWorkout}>Save Routine</button>
            <br />
            <button onClick={() => navigate('/profile')}>Cancel</button>
        </div>
    );
};

export default CreateWorkoutPage;
