import React, { useState } from "react";
import FrontView from "./FrontView";
import BackView from "./BackView";

const InteractiveBodyMap = () => {
    const [view, setView] = useState("front");
    const [selectedPart, setSelectedPart] = useState(null);

    const handlePartClick = (part) => {
        setSelectedPart(part);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Interactive Body Map</h1>
            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 mr-2 ${view === "front" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setView("front")}
                >
                    Front View
                </button>
                <button
                    className={`px-4 py-2 ${view === "back" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setView("back")}
                >
                    Back View
                </button>
            </div>
            <div className="flex justify-center">
                {view === "front" ? <FrontView onPartClick={handlePartClick} /> : <BackView onPartClick={handlePartClick} />}
            </div>
            {selectedPart && (
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold">Selected Part: {selectedPart}</h2>
                </div>
            )}
        </div>
    );
};

export default InteractiveBodyMap;
