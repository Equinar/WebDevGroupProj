import React, { useState, useEffect } from 'react';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch all users logic
        fetch('https://comp229-groupproj.onrender.com/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div className="users-container">
        <h2 className="users-header">All Users</h2>        
            <ul className="user-list">
                {users.map(user => (
                    <li key={user._id} className="user-item">
                        <img src="src\assets\icon.png" alt="Profile Icon" className="profile-icon" />
                        <div className="user-details">
                            <span className="user-label">
                                <strong>Name:</strong> {user.name}
                            </span>
                            <span className="user-label">
                                <strong>Email:</strong> {user.email}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
