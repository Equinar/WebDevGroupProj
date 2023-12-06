import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignOutButton({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            // Make a request to the backend to sign the user out
            const response = await fetch('https://comp229-groupproj.onrender.com/auth/signout', {
                method: 'GET',
            });

            // Check if the sign-out was successful
            if (response.ok) {
                // Clear any tokens or session data from the frontend
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setIsAuthenticated(false);

                // Redirect the user to the login screen after sign-out
                navigate('/login');
            } else {
                // Handle sign-out failure, if needed
                console.error('Failed to sign out');
            }
        } catch (error) {
            console.error('Error during sign-out:', error);
        }
    };

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
}

export default SignOutButton;
