import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import ExercisesPage from './components/ExercisesPage';
import AllExercisesPage from './components/AllExercisesPage';
import EditWorkoutPage from './components/EditWorkoutPage';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises/:muscle" element={< ExercisesPage />} />
        <Route path="/exercises" element={< AllExercisesPage />} />
        <Route path="/edit-workout/:workoutId" element={<EditWorkoutPage />} />


      </Routes>
    </Router>
  );
};

export default App;
