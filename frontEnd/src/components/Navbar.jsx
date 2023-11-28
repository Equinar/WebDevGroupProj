import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import logo from '../assets/logo.jpg';
import SignOutButton from './Signout';
import cart from '../assets/cart.png';

function Navbar({ isAuthenticated, handleSignOut, setIsAuthenticated }) {
    const navigateSignup = useNavigate();
    const navigateLogin = useNavigate();
    const navigateHome = useNavigate();
    const navigateAllShops = useNavigate();
    const navigateCart = useNavigate();

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
        // Navigate to the All Shops page
        navigateCart('/Cart');
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-shrink-0 items-center">
                        <img
                            className="h-8 w-auto cursor-pointer"
                            src={logo}
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
                                    <div class="flex items-center justify-between">
                                        <label class="flex-grow">Cart</label>
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
                    <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
                        {isAuthenticated ? (
                            <>
                                <SignOutButton handleSignOut={handleSignOut} setIsAuthenticated={setIsAuthenticated} />
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                    onClick={handleSignUp}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}

export default Navbar;
