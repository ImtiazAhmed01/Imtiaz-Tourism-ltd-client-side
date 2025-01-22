import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const ManageUsers = () => {
    const [combinedData, setCombinedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState(null);

    const roles = [
        { value: 'User', label: 'User' },
        { value: 'Tourist', label: 'Tourist' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, tourGuidesResponse] = await Promise.all([
                    axios.get('https://imtiaztourismltdd.vercel.app/users/all'),
                    axios.get('https://imtiaztourismltdd.vercel.app/tourguides/all'),
                ]);

                console.log('Users data:', usersResponse.data);
                console.log('Tour Guides data:', tourGuidesResponse.data);

                const combined = [
                    ...(Array.isArray(usersResponse.data) ? usersResponse.data : []).map((user) => ({
                        ...user,
                        fullName: user.fullName || user.name,
                    })),
                    ...(Array.isArray(tourGuidesResponse.data) ? tourGuidesResponse.data : []).map((guide) => ({
                        ...guide,
                        fullName: guide.fullName || guide.name,
                    })),
                ];

                setCombinedData(combined);
                setFilteredData(combined);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setCombinedData([]);
                setFilteredData([]);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = combinedData.filter((item) => {
            const matchesSearch =
                !search ||
                item.fullName.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase());
            const matchesRole = !role || item.userRole === role.value;
            return matchesSearch && matchesRole;
        });

        setFilteredData(filtered);
    }, [search, role, combinedData]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Users</h1>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '300px',
                    }}
                />
                <Select
                    options={roles}
                    value={role}
                    onChange={(selectedRole) => setRole(selectedRole)}
                    placeholder="Filter by role"
                    isClearable
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            width: 200,
                        }),
                    }}
                />
            </div>

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px',
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: '#4A148C', color: 'white' }}>
                        <th style={headerStyle}>#</th>
                        <th style={headerStyle}>Name</th>
                        <th style={headerStyle}>Email</th>
                        <th style={headerStyle}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(filteredData) && filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <tr
                                key={item._id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                                    textAlign: 'center',
                                }}
                            >
                                <td style={cellStyle}>{index + 1}</td>
                                <td style={cellStyle}>{item.fullName}</td>
                                <td style={cellStyle}>{item.email}</td>
                                <td style={cellStyle}>{item.userRole}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ ...cellStyle, textAlign: 'center', fontWeight: 'bold' }}>
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const headerStyle = {
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
};

const cellStyle = {
    padding: '10px',
    border: '1px solid #ddd',
};

export default ManageUsers;
