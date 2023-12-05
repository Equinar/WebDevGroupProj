import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

function MyShops() {
    const [userShops, setUserShops] = useState([]);
    const navigateCreateShop = useNavigate();
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        // Fetch user ID from local storage
        const userId = localStorage.getItem('userId');


        // Fetch user shops using the new route
        fetch(`http://localhost:3000/api/shops/myshops/${userId}`)
            .then((response) => response.json())
            .then((data) => setUserShops(data))
            .catch((error) => console.error('Error fetching user shops:', error));
    }, []);

    const handleCreateShop = () => {
        // Navigate to the page where the user can create a new shop
        navigateCreateShop('/create-shop');
    };

    const handleNavigateToShop = (shopId) => {
        // Navigate to the individual shop page
        navigateCreateShop(`/shop/${shopId}`);
    };

    return (
        <div>
            <h2 className='text-center text-6xl mt-4'>{userName}'s Shops</h2>

            {/* Create a New Shop button */}
            <button
                className="mt-4 bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"
                onClick={handleCreateShop}
            >
                Create Shop
            </button>

            {/* Available Shops Card */}
            <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        {/* Shop Image (Assuming shop images are available) */}
                        <img className="h-48 w-full object-cover md:w-48" src={logo} alt="Shop Image" />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            Shop Information
                        </div>
                        {/* Iterate over userShops to display available shops */}
                        {userShops.map((shop) => (
                            <div key={shop._id} className="mt-2">
                                <p
                                    onClick={() => handleNavigateToShop(shop._id)}
                                    className="block mt-1 text-lg leading-tight font-medium text-black hover:underline cursor-pointer"
                                >
                                    {shop.name}
                                </p>
                                <p className="mt-2 text-gray-500">{shop.description}</p>
                                {/* Add more shop details as needed */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyShops;
