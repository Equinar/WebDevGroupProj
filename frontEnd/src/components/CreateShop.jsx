import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateShop() {
    const [shopData, setShopData] = useState({
        name: '',
        description: '',
        // Remove picture and items from state
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShopData({ ...shopData, [name]: value });
    };

    const handleCreateShop = async (e) => {
        e.preventDefault();

        try {
            // Fetch user ID from local storage
            const userId = localStorage.getItem('userId');

            // Set default values for picture and items
            const defaultItems = []; // Set your default items here

            // Send a POST request to create a new shop
            const response = await fetch('http://localhost:3000/api/shops', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: shopData.name,
                    description: shopData.description,
                    owner: userId,
                    picture: '../frontEnd/src/assets/shops/logo.jpg', // Replace with the correct path
                    items: defaultItems,
                    // Add more fields as needed
                }),
            });

            if (response.ok) {
                // Shop created successfully
                console.log('Shop created successfully');

                // Optionally, you can navigate to the user's shops page
                navigate('/myshops');
            } else {
                // Handle error response
                console.error('Failed to create shop');
            }
        } catch (error) {
            console.error('Error creating shop:', error);
        }
    };

    return (
        <div>
            <h2 className='text-center text-6xl mt-4'>Create a New Shop</h2>

            {/* Create Shop Form */}
            <form className="max-w-md mx-auto mt-4 bg-white rounded-xl overflow-hidden md:max-w-2xl" onSubmit={handleCreateShop}>
                <div className="p-8">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Shop Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={shopData.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                            Shop Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={shopData.description}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded-md w-full"
                            required
                        />
                    </div>
                    {/* Add more form fields as needed */}
                    <div>
                        <button
                            type="submit"
                            className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create Shop
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateShop;
