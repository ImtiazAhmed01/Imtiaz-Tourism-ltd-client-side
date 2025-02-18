import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/authProvider';
import logo from '../../assets/icon/travel-bag.png'

const SideBar = () => {
    const { user } = useContext(AuthContext); // Get user from context
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`https://imtiaztourismltdd.vercel.app/users/role?email=${user.email}`, {
                        headers: { 'Authorization': `Bearer ${user.token}` },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setUserRole(data.role);
                    } else {
                        console.error('Failed to fetch user role:', data.message);
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }
        };
        fetchUserRole();
    }, [user]);


    if (!userRole) {
        return <p>Loading...</p>;
    }

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

    const dashboardContainerStyle = {
        display: 'flex',
    };

    return (
        <div style={dashboardContainerStyle} className="h-72">
            {/* Sidebar */}
            <aside style={sidebarStyle}>
                <img src={logo} alt="" />
                <ul style={sidebarMenuStyle}>
                    <li style={sidebarItemStyle}>
                        <NavLink
                            to="/dashboard/tourist/manageProfile"
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            Manage Profile
                        </NavLink>
                    </li>

                    {userRole === 'Tourist' && (
                        <>
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
                                    to="/addstories"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Add Stories
                                </NavLink>
                            </li>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/manage-stories"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Manage Stories
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

                        </>
                    )}

                    {userRole === 'Tour guide' && (
                        <>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/dashboard/tourguide/assignedtour"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    My Assigned Tours
                                </NavLink>
                            </li>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/addstories"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Add Stories
                                </NavLink>
                            </li>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/manage-stories"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Manage Stories
                                </NavLink>
                            </li>
                        </>
                    )}

                    {userRole === 'Admin' && (
                        <>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/dashboard/admin/addpackage"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Add Package
                                </NavLink>
                            </li>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/dashboard/admin/manageusers"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Manage Users
                                </NavLink>
                            </li>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/dashboard/admin/managecandidate"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Manage Candidates
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </aside>
        </div>
    );
};

export default SideBar;
// import React, { useState, useEffect, useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../Provider/authProvider';
// import logo from '../../assets/icon/travel-bag.png'

// const SideBar = () => {
//     const { user } = useContext(AuthContext); // Get user from context
//     const [userRole, setUserRole] = useState(null);
//     const [isRoleFetched, setIsRoleFetched] = useState(false); // Track if role has been fetched
//     const [isFetchingStarted, setIsFetchingStarted] = useState(false); // Track if fetch was started

//     useEffect(() => {
//         const fetchUserRole = async () => {
//             if (user?.email) {
//                 setIsFetchingStarted(true); // Mark that fetching has started
//                 try {
//                     const response = await fetch(`https://imtiaztourismltdd.vercel.app/users/role?email=${user.email}`, {
//                         headers: { 'Authorization': `Bearer ${user.token}` },
//                     });
//                     const data = await response.json();
//                     if (response.ok) {
//                         setUserRole(data.role);
//                     } else {
//                         console.error('Failed to fetch user role:', data.message);
//                     }
//                 } catch (error) {
//                     console.error('Error fetching user role:', error);
//                 } finally {
//                     setIsRoleFetched(true); // Mark as fetched
//                 }
//             }
//         };
//         fetchUserRole();
//     }, [user]);

//     // Set default role to Tourist if:
//     // 1. Fetching is complete but no role is found OR
//     // 2. No fetching is done till now (isFetchingStarted is false)
//     useEffect(() => {
//         if ((isRoleFetched && !userRole) || !isFetchingStarted) {
//             setUserRole("Tourist");
//         }
//     }, [isRoleFetched, isFetchingStarted, userRole]);

//     // Show Loading only if fetching started but not yet completed
//     if (isFetchingStarted && !isRoleFetched) {
//         return <p>Loading...</p>;
//     }

//     const sidebarStyle = {
//         width: '250px',
//         backgroundColor: '#008080',
//         padding: '20px',
//         boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
//         height: '100vh',
//     };

//     const sidebarMenuStyle = {
//         listStyleType: 'none',
//         padding: '0',
//         margin: '0',
//     };

//     const sidebarItemStyle = {
//         marginBottom: '15px',
//     };

//     const linkStyle = {
//         display: 'block',
//         width: '100%',
//         padding: '10px 15px',
//         backgroundColor: '#ffffff',
//         border: '1px solid #ddd',
//         borderRadius: '5px',
//         textAlign: 'left',
//         fontSize: '16px',
//         color: '#333',
//         textDecoration: 'none',
//         cursor: 'pointer',
//         transition: 'all 0.3s ease',
//     };

//     const activeLinkStyle = {
//         backgroundColor: '#007bff',
//         color: '#ffffff',
//         borderColor: '#007bff',
//     };

//     const dashboardContainerStyle = {
//         display: 'flex',
//     };

//     return (
//         <div style={dashboardContainerStyle} className="h-72">
//             <aside style={sidebarStyle}>
//                 <img src={logo} alt="" />
//                 <ul style={sidebarMenuStyle}>
//                     <li style={sidebarItemStyle}>
//                         <NavLink
//                             to="/dashboard/tourist/manageProfile"
//                             style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                         >
//                             Manage Profile
//                         </NavLink>
//                     </li>

//                     {userRole === 'Tourist' && (
//                         <>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/dashboard/tourist/myBookings"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     My Bookings
//                                 </NavLink>
//                             </li>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/addstories"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     Add Stories
//                                 </NavLink>
//                             </li>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/manage-stories"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     Manage Stories
//                                 </NavLink>
//                             </li>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/dashboard/tourist/joinguide"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     Join as Tour Guide
//                                 </NavLink>
//                             </li>
//                         </>
//                     )}

//                     {userRole === 'Tour guide' && (
//                         <>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/dashboard/tourguide/assignedtour"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     My Assigned Tours
//                                 </NavLink>
//                             </li>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/addstories"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     Add Stories
//                                 </NavLink>
//                             </li>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/manage-stories"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     Manage Stories
//                                 </NavLink>
//                             </li>
//                         </>
//                     )}

//                     {userRole === 'Admin' && (
//                         <>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/dashboard/admin/addpackage"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     Add Package
//                                 </NavLink>
//                             </li>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/dashboard/admin/manageusers"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     Manage Users
//                                 </NavLink>
//                             </li>
//                             <li style={sidebarItemStyle}>
//                                 <NavLink
//                                     to="/dashboard/admin/managecandidate"
//                                     style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
//                                 >
//                                     Manage Candidates
//                                 </NavLink>
//                             </li>
//                         </>
//                     )}
//                 </ul>
//             </aside>
//         </div>
//     );
// };

// export default SideBar;
