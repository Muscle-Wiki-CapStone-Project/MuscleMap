import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo-link">
                <h2 className="site-name">MuscleMap</h2>
            </Link>
            <div className="nav-content">
                <div className="nav-logo">
                </div>


                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>


                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li>
                        <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;