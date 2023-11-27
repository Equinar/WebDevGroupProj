import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';

import logo from '../assets/logo.jpg';

function Navbar() {
    const navigateSignup = useNavigate();
    const navigateLogin = useNavigate();
    const navigateHome = useNavigate();

    const handleSignUp = () => {
        // Navigate to the Signup page
        navigateSignup('/signup');
    };
    const handleSignIn = () => {
        // Navigate to the Signup page
        navigateLogin('/login');
    };

    const handleGoHome = () => {
        // Navigate to the Home page
        navigateHome('/');
    };

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {() => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">

                                <div className="flex flex-shrink-0 items-center" onClick={handleGoHome}>
                                    <img
                                        className="h-8 w-auto cursor-pointer"
                                        src={logo}
                                        alt="Brogrammers"
                                    />
                                    <h3 className="mx-4 text-gray-300 cursor-pointer">Brogrammers</h3>
                                </div>

                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                    <button
                                        type="button"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                        onClick={handleSignIn}
                                    >
                                        Sign In
                                    </button>
                                    {/* Add signup button */}
                                    <button
                                        type="button"
                                        className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                        onClick={handleSignUp}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ... Remaining code for mobile menu and navigation links */}
                    </>
                )}
            </Disclosure>
        </>
    );
}

export default Navbar;
