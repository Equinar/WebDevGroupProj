import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditShop() {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const [shopData, setShopData] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        // Fetch shop details using the shopId from the URL params
        // and set the initial data in the form
        // Replace the following fetch with your actual API call
        fetch(`http://localhost:3000/api/shops/${shopId}`)
            .then(response => response.json())
            .then(data => {
                setShopData({
                    name: data.name,
                    description: data.description,
                });
            })
            .catch(error => console.error('Error fetching shop details:', error));
    }, [shopId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShopData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/shops/${shopId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: shopData.name,
                    description: shopData.description,
                }),
            });

            if (response.ok) {
                console.log('Shop updated successfully');
                navigate('/myshops');
            } else {
                console.error('Error updating shop:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating shop:', error);
        }
    };

    return (
        <div>
            <h2 className='mt-4 text-3xl text-center'>Edit Shop</h2>
            <form onSubmit={handleSubmit} className='mt-4 max-w-md mx-auto'>
                <div className='mb-4'>
                    <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>
                        Shop Name:
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={shopData.name}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='description' className='block text-gray-700 text-sm font-bold mb-2'>
                        Shop Description:
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        value={shopData.description}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditShop;
