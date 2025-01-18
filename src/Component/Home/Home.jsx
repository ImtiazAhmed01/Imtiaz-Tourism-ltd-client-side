import React, { useState } from 'react';
import MyCarousel from './MyCarousel';
import OverviewSection from './OverviewSection';
import TourismAndTravelGuide from './TourismAndTravelGuide';
import TouristStorySection from './touristStorySection';
import TopDestination from './TopDestination';
import CulturalHighlightBD from './culturalHighlightBD';

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };
    return (
        <div className={darkMode ? "bg-black text-white" : "bg-white text-black"}>
            <div>
                <button
                    onClick={toggleTheme}
                    className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"}`}
                >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>

            <MyCarousel></MyCarousel>
            <div>
                <OverviewSection></OverviewSection>
            </div>
            <div>
                <TourismAndTravelGuide></TourismAndTravelGuide>
            </div>
            <div>
                <TouristStorySection></TouristStorySection>
            </div>
            <div>
                <TopDestination></TopDestination>
            </div>
            <div>
                <CulturalHighlightBD></CulturalHighlightBD>

            </div>
        </div>
    );
};

export default Home;