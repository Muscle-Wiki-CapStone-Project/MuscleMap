import React from "react";

const BackView = ({ onPartClick }) => {
    return (
        <svg viewBox="0 0 660.46 1206.46" className="w-full max-w-md">
            <defs>
                <radialGradient id="jointradial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{ stopColor: "rgb(254, 91, 127)", stopOpacity: 1 }}></stop>
                    <stop offset="100%" style={{ stopColor: "rgb(231, 236, 239)", stopOpacity: 1 }}></stop>
                </radialGradient>
            </defs>
            <g
                id="traps"
                className="bodymap text-mw-gray hover:text-mw-red-100 cursor-pointer"
                onClick={() => onPartClick("Traps")}
            >
                <path
                    d="M100,200 L150,200 L150,250 L100,250 Z"  // Simple square path for testing
                    fill="currentColor"
                ></path>
            </g>
            {/* Add other body parts here for the back view */}
        </svg>
    );
};

export default BackView;
