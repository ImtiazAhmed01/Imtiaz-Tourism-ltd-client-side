import React from 'react';

const TourGuideDashboard = () => {
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

    const buttonStyle = {
        width: '100%',
        padding: '10px 15px',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        textAlign: 'left',
        fontSize: '16px',
        color: '#333',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#007bff',
        color: '#ffffff',
        borderColor: '#007bff',
    };

    const mainContentStyle = {
        flexGrow: 1,
        padding: '20px',
        backgroundColor: '#f1f3f4',
        height: '100vh',
    };

    const dashboardContainerStyle = {
        display: 'flex',
    };
    return (
        <div style={dashboardContainerStyle}>
            {/* Sidebar */}
            <aside style={sidebarStyle} className='bg-[#008080]'>
                <ul style={sidebarMenuStyle}>
                    <li style={sidebarItemStyle}>
                        <button
                            style={buttonStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                        >
                            Manage Profile
                        </button>
                    </li>
                    <li style={sidebarItemStyle}>
                        <button
                            style={buttonStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                        >
                            My Assigned Tours
                        </button>
                    </li>
                    <li style={sidebarItemStyle}>
                        <button
                            style={buttonStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                        >
                            Add Stories
                        </button>
                    </li>
                    <li style={sidebarItemStyle}>
                        <button
                            style={buttonStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                        >
                            Manage Stories
                        </button>
                    </li>

                </ul>
            </aside>
            <main style={mainContentStyle}>
                <h1>Tour guide dashboard</h1>
            </main>

        </div>
    );
};

export default TourGuideDashboard;