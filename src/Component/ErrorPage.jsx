import React from "react";
import errorImg from "../assets/images/errorImage/4121421_2153483.jpg"

const ErrorPage = () => {
    return (
        <div className="bg-black">
            <h1 className="text-white font-bold text-center pt-24">404 - Page Not Found</h1>
            <img className="mx-auto w-2/5" src={errorImg} alt="" />
        </div>
    );
};

export default ErrorPage;