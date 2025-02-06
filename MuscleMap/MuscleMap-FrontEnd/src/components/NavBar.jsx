import React from "react";
import { Link } from "react-router-dom";
// import "./Navbar.css"; // Optional: Add styles

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <h2>MuscleMap</h2>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
