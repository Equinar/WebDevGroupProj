import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
const Shop = require('../models/shop.model.js');


const CreateItemForm = () => {
  const { shopId } = useParams();
  console.log('Current shopId:', shopId);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    picture: '../frontEnd/src/assets/items/items.jpg', // Check this relative path
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3000/api/shops/${shopId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Item created successfully');
        // You can redirect or handle success as needed
      } else {
        console.error('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error.message); // Access the error message property
    }
  };
  
  return (
    <div>
      <h2 className="text-center text-6xl mt-4">Create a New Item</h2>

      {/* Create Item Form */}
      <form className="max-w-md mx-auto mt-4 bg-white rounded-xl overflow-hidden md:max-w-2xl" onSubmit={handleCreateItem}>
        <div className="p-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Item Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="picture" className="block text-sm font-medium text-gray-600">
              Item Picture (Relative Path)
            </label>
            <input
              type="text"
              id="picture"
              name="picture"
              value={formData.picture}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Item Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div>
            <button type="submit" className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateItemForm;
