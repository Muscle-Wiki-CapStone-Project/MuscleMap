// // src/components/HomePage.jsx
// import React from "react";
// import "./HomePage.css";

// const HomePage = () => {
//     // Click handler for muscle groups
//     const handleMuscleClick = (muscleId) => {
//         console.log(`Muscle clicked: ${muscleId}`);
//         // Add logic here for routing or showing exercise info
//     };

//     return (
//         <div className="home-page-container">
//             <svg
//                 viewBox="0 0 660.46 1206.46"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-screen lg:w-full mc:h-[700px] 2xl:h-[90vh] 3xl:h-[95vh] 4xl:h-screen sm:mx-auto object-fit menor"
//             >
//                 <defs>
//                     <radialGradient id="jointradial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
//                         <stop offset="0%" stopColor="rgb(254, 91, 127)" stopOpacity="1" />
//                         <stop offset="100%" stopColor="rgb(231, 236, 239)" stopOpacity="1" />
//                     </radialGradient>
//                 </defs>
//                 {/* Example Muscle Group: Calves */}
//                 <g
//                     id="calves"
//                     className="bodymap text-mw-gray active:text-mw-red-700 lg:hover:text-mw-red-100"
//                     onClick={() => handleMuscleClick("calves")}
//                 >
//                     <path
//                         d="M502.8,1183.5c-.68,1.05-1.86,1.29-2.74,1.31-.93.02-1.69.81-1.69,1.77..."
//                         fill="currentColor"
//                     ></path>
//                     <path
//                         d="M265.06,986.92c-1.51,2.16-3.08,4.4-4.18,8.22-20.71,67.67-19.28,84.05..."
//                         fill="currentColor"
//                     ></path>
//                 </g>
//                 {/* Add more muscle groups like this */}
//                 <g
//                     id="biceps"
//                     className="bodymap text-mw-gray active:text-mw-red-700 lg:hover:text-mw-red-100"
//                     onClick={() => handleMuscleClick("biceps")}
//                 >
//                     <path d="..." fill="currentColor"></path>
//                 </g>
//                 <g
//                     id="triceps"
//                     className="bodymap text-mw-gray active:text-mw-red-700 lg:hover:text-mw-red-100"
//                     onClick={() => handleMuscleClick("triceps")}
//                 >
//                     <path d="..." fill="currentColor"></path>
//                 </g>
//                 {/* Repeat for all other muscle groups */}
//             </svg>
//         </div>
//     );
// };

// export default HomePage;
import React from "react";
import InteractiveBodyMap from "./InteractiveBodyMap";

const HomePage = () => {
    return (
        <div className="homepage-container">
            <InteractiveBodyMap />
        </div>
    );
};

export default HomePage;
