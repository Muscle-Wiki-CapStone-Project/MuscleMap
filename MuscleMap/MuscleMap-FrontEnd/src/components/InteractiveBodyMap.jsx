import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FrontView from "./FrontView";
import BackView from "./BackView";
import FemaleFrontView from "./FemaleFrontView";
import FemaleBackView from "./FemaleBackView";

const InteractiveBodyMap = () => {
    const [isFront, setIsFront] = useState(true);
    const [isFemale, setIsFemale] = useState(false);

    return (
        <div className="body-map-wrapper">
            <div className="body-map-controls">
                <button
                    onClick={() => setIsFront(!isFront)}
                    className="view-toggle"
                >
                    {isFront ? 'Show Back' : 'Show Front'}
                </button>
                <button
                    onClick={() => setIsFemale(!isFemale)}
                    className="gender-toggle"
                >
                    {isFemale ? 'Male Model' : 'Female Model'}
                </button>
            </div>
            <div className="body-map-container">
                {isFemale ? (
                    isFront ? <FemaleFrontView /> : <FemaleBackView />
                ) : (
                    isFront ? <FrontView /> : <BackView />
                )}
            </div>
        </div>
    );
};

export default InteractiveBodyMap;