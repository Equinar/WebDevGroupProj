import React, { useState, useEffect } from 'react';
import '../styles/editprofile.css';
import Switch from "react-switch";

function ProfileTable({ user, onUpdate }) {
    const [editedUser, setEditedUser] = useState(user);
    const [checked, setChecked] = useState(user.role === 'seller');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSwitchChange = (nextChecked) => {
        setChecked(nextChecked);
        setEditedUser({ ...editedUser, role: nextChecked ? 'seller' : 'user' });
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
                    <td className='tdItems'>Name</td>
                </tr>
                <tr>
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
                    <td className='tdItems'>Email</td>
                </tr>
                <tr>
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
                    <td className='tdPassword'>Password</td>
                </tr>
                <tr>
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
                    <hr></hr>
                    <p className='subtitle'>Switch to Seller Account</p>
                </tr>
                <label>
                    <span>{checked ? "Active" : "Inactive"}</span>
                    <Switch
                        onChange={handleSwitchChange}
                        checked={checked}
                        className="switchbtn"
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={48}
                    />
                </label>
                <tr>
                    <td colSpan="2">
                        <button className='submitbtn' type="submit">Submit</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    );
}

function EditProfile() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetch('https://comp229-groupproj.onrender.com/api/users/' + userId)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error('User data incorrect!：', error));
    }, []);

    const handleUpdateUser = (updatedUser) => {
        fetch('https://comp229-groupproj.onrender.com/api/users/' + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                // Update local storage with the new user data
                localStorage.setItem('userName', data.name);
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userRole', data.role);

                alert('Updated Successfully');
            })
            .catch((error) => console.error('Updated Error.', error));
    };

    return (
        <div>
            <div className='editProfileMain'>
                {user ? (
                    <div>
                        <p className='title'>Edit My Profile</p>
                        <div className='editFrom'>
                            <ProfileTable user={user} onUpdate={handleUpdateUser} />
                        </div>
                    </div>
                ) : (
                    <p>Not authentication.</p>
                )}
            </div>
        </div>
    );
}

export default EditProfile;
