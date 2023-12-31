import logo from '../assets/logo.jpg'
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";



function Login({ onLogin }) {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the server
            const response = await fetch('https://comp229-groupproj.onrender.com/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Check if the request was successful (status code 200)
            if (response.ok) {
                // Parse the JSON response
                const data = await response.json();
                const token = data.token;
                const decoded = jwtDecode(token);
                console.log(decoded);
                const userId = decoded._id;
                const userName = decoded.name;
                const userEmail = decoded.email;
                const userJoinDate = new Date(decoded.created).toLocaleDateString();
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('userName', userName);
                localStorage.setItem('userEmail', userEmail);
                localStorage.setItem('userJoinDate', userJoinDate);
                console.log(userId);
                console.log('Decoded joinDate:', userJoinDate);
                onLogin(); // Update isAuthenticated state in App
                console.log('Sign-in successful:', data);
                navigate('/')

                // Perform any actions you need after successful login
            } else {
                // If the request was not successful, handle the error
                const errorData = await response.json();
                console.error('Authentication failed:', errorData);

                // Display an error message to the user
                alert('Authentication failed. Invalid email or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-25 w-25"
                        src={logo}
                        alt="Brogrammers"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSignIn}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
