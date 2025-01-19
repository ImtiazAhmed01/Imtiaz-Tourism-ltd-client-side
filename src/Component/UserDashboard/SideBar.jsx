import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {

    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#008080',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        height: '100vh',
    };

    const sidebarMenuStyle = {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    };

    const sidebarItemStyle = {
        marginBottom: '15px',
    };

    const linkStyle = {
        display: 'block',
        width: '100%',
        padding: '10px 15px',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        textAlign: 'left',
        fontSize: '16px',
        color: '#333',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    };

    const activeLinkStyle = {
        backgroundColor: '#007bff',
        color: '#ffffff',
        borderColor: '#007bff',
    };

    // const mainContentStyle = {
    //     flexGrow: 1,
    //     padding: '20px',
    //     backgroundColor: '#f1f3f4',
    //     height: '100vh',
    // };

    const dashboardContainerStyle = {
        display: 'flex',
    };


    return (
        < div style={dashboardContainerStyle} >
            {/* Sidebar */}
            < aside style={sidebarStyle} >
                <ul style={sidebarMenuStyle}>
                    <li style={sidebarItemStyle}>
                        <NavLink
                            to="/dashboard/tourist/manageProfile"
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            Manage Profile
                        </NavLink>

                    </li>
                    <li style={sidebarItemStyle}>
                        <NavLink
                            to="/dashboard/tourist/myBookings"
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            My Bookings
                        </NavLink>
                    </li>
                    <li style={sidebarItemStyle}>
                        <NavLink
                            to="/dashboard/tourist/manageStories"
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            Manage Stories
                        </NavLink>
                    </li>
                    <li style={sidebarItemStyle}>
                        <NavLink
                            to="/dashboard/tourist/addStories"
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            Add Stories
                        </NavLink>
                    </li>
                    <li style={sidebarItemStyle}>
                        <NavLink
                            to="/dashboard/tourist/joinguide"
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            Join as Tour Guide
                        </NavLink>
                    </li>
                </ul>
            </aside >
        </div >
    );
};

export default SideBar;