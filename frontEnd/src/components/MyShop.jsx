import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

function MyShops() {
    const [userShops, setUserShops] = useState([]);
    const [newShops, setNewShops] = useState([]);
    const navigateCreateShop = useNavigate();
    const userName = localStorage.getItem('userName');
    const navigateEditShop = useNavigate();

    useEffect(() => {
        // Fetch user ID from local storage
        const userId = localStorage.getItem('userId');

        // Fetch user shops using the new route
        fetch(`http://localhost:3000/api/shops/myshops/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                // Split shops into existing and new based on some criteria (e.g., isNew property)
                const existingShops = data.filter((shop) => !shop.isNew);
                const newShops = data.filter((shop) => shop.isNew);

                setUserShops(existingShops);
                setNewShops(newShops);
            })
            .catch((error) => console.error('Error fetching user shops:', error));
    }, []);

    const handleCreateShop = () => {
        // Navigate to the page where the user can create a new shop
        navigateCreateShop('/create-shop');
    };
    const handleEditShop = (shopId) => {
        // Navigate to the edit shop page for the specific shop
        navigateEditShop(`/editshop/${shopId}`);
    };

    const handleNavigateToShop = (shopId) => {
        // Navigate to the individual shop page
        navigateCreateShop(`/shop/${shopId}`);
    };

    const handleDeleteShop = async (shopId) => {
        // Implement the logic to delete the shop using the shopId
        try {
            const response = await fetch(`http://localhost:3000/api/shops/${shopId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update the state after successful deletion
                setUserShops((prevShops) => prevShops.filter((shop) => shop._id !== shopId));
            } else {
                console.error('Error deleting shop:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting shop:', error);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className='text-center text-6xl mt-4'>{userName}'s Shops</h2>
            {/* Create a New Shop button */}
            <button
                className="mt-4 bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreateShop}
            >
                Create Shop
            </button>

            {/* Display Existing Shops */}
            <div className="mt-4 max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
                {userShops.map((shop) => (
                    <div key={shop._id} className="md:flex mt-2">
                        <div className="md:flex-shrink-0">
                            {/* Shop Image (Assuming shop images are available) */}
                            <img className="h-48 w-full object-cover md:w-48" src={logo} alt="Shop Image" />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                Shop Information
                            </div>
                            <p
                                onClick={() => handleNavigateToShop(shop._id)}
                                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline cursor-pointer"
                            >
                                {shop.name}
                            </p>
                            <p className="mt-2 text-gray-500">{shop.description}</p>
                            {/* Add more shop details as needed */}

                            <button
                                className="mt-4 bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"
                                onClick={() => handleDeleteShop(shop._id)}
                            >
                                Delete Shop
                            </button>

                            <button
                                className="mt-4 bg-blue-400 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"
                                onClick={() => handleEditShop(shop._id)}
                            >
                                Edit Shop
                            </button>
                        </div>
                    </div>

                ))}
            </div>

            {/* Display New Shops */}
            <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl mt-4">
                {newShops.map((shop) => (
                    <div key={shop._id} className="md:flex mt-2">
                        <div className="md:flex-shrink-0">
                            {/* Shop Image (Assuming shop images are available) */}
                            <img className="h-48 w-full object-cover md:w-48" src={logo} alt="Shop Image" />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                New Shop Information
                            </div>
                            <p
                                onClick={() => handleNavigateToShop(shop._id)}
                                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline cursor-pointer"
                            >
                                {shop.name}
                            </p>
                            <p className="mt-2 text-gray-500">{shop.description}</p>
                            {/* Add more shop details as needed */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyShops;
