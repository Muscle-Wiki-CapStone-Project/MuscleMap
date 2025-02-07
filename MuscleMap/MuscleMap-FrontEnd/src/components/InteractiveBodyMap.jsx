import React, { useState } from "react";
import FemaleFrontView from "./FemaleFrontView";
import FemaleBackView from "./FemaleBackView"
import BackView from "./BackView";
import FrontView from "./FrontView"

const InteractiveBodyMap = () => {
    const [gender, setGender] = useState("female"); // "male" or "female"
    const [view, setView] = useState("front"); // "front" or "back"
    const [selectedPart, setSelectedPart] = useState(null);

    const handlePartClick = (part) => {
        setSelectedPart(part);
        console.log(`You clicked on: ${part}`);
    };

    const renderBodyView = () => {
        if (gender === "male" && view === "front") return <FrontView onClick={handlePartClick} />;
        if (gender === "male" && view === "back") return <BackView onClick={handlePartClick} />;
        if (gender === "female" && view === "front") return <FemaleFrontView onClick={handlePartClick} />;
        if (gender === "female" && view === "back") return <FemaleBackView onClick={handlePartClick} />;
    };

    return (
        <div className="flex flex-col items-center">
            {/* Gender Toggle */}
            <div className="flex space-x-4 mb-4">
                <button className={`px-4 py-2 rounded ${gender === "male" ? "bg-blue-600 text-white" : "bg-gray-300"}`} onClick={() => setGender("male")}>
                    Male
                </button>
                <button className={`px-4 py-2 rounded ${gender === "female" ? "bg-pink-500 text-white" : "bg-gray-300"}`} onClick={() => setGender("female")}>
                    Female
                </button>
            </div>

            {/* View Toggle */}
            <div className="flex space-x-4 mb-4">
                <button className={`px-4 py-2 rounded ${view === "front" ? "bg-green-500 text-white" : "bg-gray-300"}`} onClick={() => setView("front")}>
                    Front View
                </button>
                <button className={`px-4 py-2 rounded ${view === "back" ? "bg-green-500 text-white" : "bg-gray-300"}`} onClick={() => setView("back")}>
                    Back View
                </button>
            </div>

            {/* Render the selected view */}
            <div className="relative">
                {renderBodyView()}
            </div>

            {/* Selected Body Part Display */}
            {selectedPart && (
                <div className="mt-4 p-2 bg-gray-200 rounded">
                    <p>You selected: <strong>{selectedPart}</strong></p>
                </div>
            )}
        </div>
    );
};

export default InteractiveBodyMap;
