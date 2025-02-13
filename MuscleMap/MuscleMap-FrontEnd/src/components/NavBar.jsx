import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Cookies from 'js-cookie';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if session_id exists in cookies
        const session = Cookies.get('session_id');
        setIsLoggedIn(!!session);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo-link">
                <h2 className="site-name">MuscleMap</h2>
            </Link>
            <div className="nav-content">
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li>
                        <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
                    </li>

                    {!isLoggedIn && (
                        <>
                            <li>
                                <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                            </li>
                        </>
                    )}

                    {isLoggedIn && (
                        <li>
                            <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
