import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import ExercisesPage from './components/ExercisesPage';
import AllExercisesPage from './components/AllExercisesPage';
import CreateWorkoutPage from './components/CreateWorkoutPage';
import EditWorkoutPage from './components/EditWorkoutPage';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/exercises/:muscle" element={< ExercisesPage />} />
        <Route path="/exercises" element={< AllExercisesPage />} />
        <Route path="/create-workout" element={<CreateWorkoutPage />} />
        <Route path="/edit-workout/:workoutId" element={<EditWorkoutPage />} />
        <Route path="/" element={<LandingPage />} />


      </Routes>
    </Router>
  );
};

export default App;
