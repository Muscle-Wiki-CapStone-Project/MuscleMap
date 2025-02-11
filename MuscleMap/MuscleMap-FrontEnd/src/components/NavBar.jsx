import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"

const NavBar = () => {

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <h2 className="site-name">MuscleMap</h2>
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
