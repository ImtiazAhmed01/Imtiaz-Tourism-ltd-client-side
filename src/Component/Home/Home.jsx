import React, { useState } from 'react';
import MyCarousel from './MyCarousel';

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
        </div>
    );
};

export default Home;