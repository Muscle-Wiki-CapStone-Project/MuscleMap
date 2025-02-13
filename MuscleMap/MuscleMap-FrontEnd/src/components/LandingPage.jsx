import React from "react";
import NavBar from "./NavBar";
import "../styles.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <div>
            {/* <NavBar /> */}
            <main>
                <section className="hero">
                    <h1>Map Your Muscles, Maximize Your Potential.</h1>
                    <p>
                        Discover tailored workouts for every muscle group and unlock your full fitness potential.
                    </p>
                    <button className="btn-primary" onClick={() => navigate("/home")}>Get Started</button>
                </section>

                <section className="features">
                    <h2>Why Choose Muscle Map?</h2>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <h3>Personalized Workouts</h3>
                            <p>Tailored exercise plans based on your specific muscle targeting needs.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Interactive Muscle Map</h3>
                            <p>Visually explore and learn about different muscle groups and exercises.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Progress Tracking</h3>
                            <p>Monitor your fitness journey and see your improvements over time.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2025 Muscle Map. All rights reserved.</p>
            </footer>
        </div>
    );
}
