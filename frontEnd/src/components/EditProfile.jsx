import React, { useState, useEffect } from 'react';

function ProfileTable({ user, onUpdate }) {
    const [editedUser, setEditedUser] = useState(user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(editedUser);
    };

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>
                            <input
                                type="text"
                                name="name"
                                value={editedUser.name}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>
                            <input
                                type="email"
                                name="email"
                                value={editedUser.email}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>
                            <input
                                type="password"
                                name="password"
                                value={editedUser.password}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button type="submit">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form >
    );
}

function UserProfile() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetch('http://localhost:3000/api/users/' + userId)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error('User data incorrect!：', error));
    }, []);

    const handleUpdateUser = (updatedUser) => {
        fetch('http://localhost:3000/api/users/' + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                alert('Updated Successfully');
            })
            .catch((error) => console.error('Updated Error.', error));
    };

    return (
        <div>
            <div className='main'>

                {user ? (
                    <div>
                        <p className='title'>Edit My Profile</p>
                        <ProfileTable user={user} onUpdate={handleUpdateUser} />
                    </div>
                ) : (
                    <p>Not authentication.</p>
                )}
            </div>

        </div>
    );
}

export default UserProfile;

