import React from "react";
import errorImg from "../assets/images/errorImage/4121421_2153483.jpg"
import { useNavigate } from 'react-router-dom';



const ErrorPage = () => {
    const navigate = useNavigate();
    const handlehome = () => {
        navigate("/")
    }
    return (
        <div className="bg-black">
            <button className="mt-4 px-4 py-2 bg-[#FFA500] text-white rounded-lg hover:bg-[#3F0113] hover:text-[#FFA500] transition" onClick={() => handlehome()}>GO TO HOME</button>
            <h1 className="text-white font-bold text-center pt-24">404 - Page Not Found</h1>
            <img className="mx-auto w-2/5" src={errorImg} alt="" />

        </div>
    );
};

export default ErrorPage;