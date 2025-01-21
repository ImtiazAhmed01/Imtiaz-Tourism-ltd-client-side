import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState(null);

    const roles = [
        { value: 'User', label: 'User' },
        { value: 'Tourist', label: 'Tourist' },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            const params = {};
            if (search) params.search = search;
            if (role) params.role = role?.value;

            console.log('Params being sent to backend:', params);

            try {
                const response = await axios.get('http://localhost:5000/users/all', { params });
                console.log('Response from server:', response.data);
                setUsers(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching users:', error.message);
                setUsers([]);
            }
        };

        fetchUsers();
    }, [search, role]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Users</h1>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => {
                        console.log('Search input updated:', e.target.value);
                        setSearch(e.target.value);
                    }}
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
                    onChange={(selectedRole) => {
                        console.log('Role selected:', selectedRole);
                        setRole(selectedRole);
                    }}
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
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map((user, index) => (
                            <tr
                                key={user._id}
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                                    textAlign: 'center',
                                }}
                            >
                                <td style={cellStyle}>{index + 1}</td>
                                <td style={cellStyle}>{user.fullName}</td>
                                <td style={cellStyle}>{user.email}</td>
                                <td style={cellStyle}>{user.userRole}</td>
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

// Styles for the table headers and cells
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
