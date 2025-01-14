import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
// import { AuthContext } from "../Provider/authProvider";
// import { NavLink, useNavigate } from "react-router-dom";


const Navbar = () => {
    // const { user, signOutUser } = useContext(AuthContext);
    // const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         await signOutUser();
    //         console.log("User logged out successfully");
    //         navigate("/");  // Redirect to home after logout
    //     } catch (error) {
    //         console.error("Logout error:", error.message);
    //         alert("Failed to log out. Please try again.");
    //     }
    // };

    const links = (
        <>
            <li>
                <NavLink to="" activeclassname="active">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="" activeclassname="active">
                    Rooms
                </NavLink>
            </li>

            {/* {user && user.displayName && (
                <>
                    <li>
                        <NavLink to="" activeclassname="active">
                            My Bookings
                        </NavLink>
                    </li>
                </>
            )} */}
        </>
    );

    return (
        <div>
            {/* {user && user.displayName && (
                <div className="bg-[#FEFAE0] text-center py-2">
                    <span className="text-sm font-medium text-[#333533]">
                        Welcome, {user.displayName}!
                    </span>
                </div>
            )} */}
            <div className="navbar" style={{ backgroundColor: "#e5e4e2" }}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden text-[#3F0113]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow"
                            style={{ backgroundColor: "#FEFAE0", color: "#333533" }}
                        >
                            {links}
                        </ul>
                    </div>

                    <NavLink
                        to="/"
                        className="btn btn-ghost normal-case md:text-xl font-bold text-[#3F0113]"
                    >
                        Imtiaz Tourism Ltd
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-[#3F0113]">{links}</ul>
                </div>
                <div className="navbar-end gap-4 flex items-center">
                    {/* {user && user.photoURL && (
                        <div className="relative group">
                            <img
                                src={user.photoURL}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <div
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm bg-black bg-opacity-75 py-1 px-2 rounded-lg text-[#3F0113] opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {user.displayName}
                            </div>
                        </div>
                    )}
                    {user && user.displayName ? (
                        <div className="flex items-center gap-4">
                            <button
                                className="btn"
                                style={{
                                    backgroundColor: "#DDA15E",
                                    color: "#3F0113",
                                    border: "none",
                                }}
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `btn ${isActive ? "bg-[#BC6C25] text-[#3F0113]" : "btn-outline border-[#BC6C25] text-[#BC6C25]"}`
                                }
                            >
                                Sign Up
                            </NavLink>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `btn ${isActive ? "bg-[#BC6C25] text-[#3F0113]" : "btn-outline border-[#BC6C25] text-[#BC6C25]"}`
                                }
                            >
                                Log In
                            </NavLink>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
