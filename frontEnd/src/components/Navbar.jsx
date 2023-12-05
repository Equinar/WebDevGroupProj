import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import logo from '../assets/logo.jpg';
import SignOutButton from './Signout';
import cart from '../assets/cart.png';

function Navbar({ isAuthenticated, onLogout, setIsAuthenticated }) {
    const navigateSignup = useNavigate();
    const navigateLogin = useNavigate();
    const navigateHome = useNavigate();
    const navigateAllShops = useNavigate();
    const navigateCart = useNavigate();
    const navigateProfile = useNavigate();
    const navigateMyShops = useNavigate();


    const handleSignUp = () => {
        // Navigate to the Sign Up page
        navigateSignup('/signup');
    };

    const handleSignIn = () => {
        // Navigate to the Sign In page
        navigateLogin('/login');
    };

    const handleGoHome = () => {
        // Navigate to the Home page
        navigateHome('/');
    };

    const handleGoAllShops = () => {
        // Navigate to the All Shops page
        navigateAllShops('/allshops');
    };

    const handleGoCart = () => {
        // Navigate to the Cart page
        navigateCart('/cart');
    };


    const handleGoProfile = () => {
        // Navigate to the My profile page
        navigateProfile('/profile');
    };

    const handleLogout = () => {
        onLogout();
        localStorage.removeItem('token');
        navigateLogin('/login');
    };

    const handleGoMyShops = () => {
        // Navigate to the MyShops page
        navigateMyShops('/myshops');
    };

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {() => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">


                                {/* Home page button */}

                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto cursor-pointer"
                                        src={logo}
                                        onClick={handleGoHome}
                                        alt="Brogrammers"
                                    />
                                    <h3 className="mx-4 text-gray-300 cursor-pointer" onClick={handleGoHome}>Brogrammers</h3>

                                    {/* All shops button */}

                                    <button
                                        type="button"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                        onClick={handleGoAllShops}
                                    >
                                        All Shops
                                    </button>


                                    {/* Cart button */}

                                    <button
                                        type="button"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                        onClick={handleGoCart}
                                    >
                                        <div class="flex items-center cursor-pointer justify-between">
                                            <label class="flex-grow cursor-pointer">Cart</label>
                                            <img class="h-4 w-auto cursor-pointer" src={cart} alt="cart_icon" />
                                        </div>

                                    </button>
                                </div>

                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {isAuthenticated && (
                                            <button
                                                type="button"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                            >
                                                <Link to="/users">Users</Link>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                    {isAuthenticated ? (
                                        <>
                                            {/* Add My Shops button */}
                                            <button
                                                type="button"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                                onClick={handleGoMyShops}
                                            >
                                                My Shops
                                            </button>

                                            <button type="button"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                                onClick={handleGoProfile}>My Profile</button>

                                            <button type="button"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                                onClick={handleLogout}>Sign Out</button>

                                        </>
                                    ) : (
                                        <>
                                            <button type="button"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                                onClick={handleSignUp} >Sign Up</button>
                                            <button type="button"
                                                className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                                onClick={handleSignIn} >Sign In</button>
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </Disclosure>
        </>
    );
}

export default Navbar;
