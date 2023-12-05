import React, { useState } from 'react';
import '../styles/cart.css';
import Image from '../assets/logo.jpg';

const Cart = () => {
  const initialItems = [
    { id: 1, image: Image, shopName: 'Shop A', itemName: 'Item 1', count: 1, price: 50, totalPrice: 50 },
    { id: 2, image: Image, shopName: 'Shop B', itemName: 'Item 2', count: 1, price: 50, totalPrice: 50 },
    { id: 3, image: Image, shopName: 'Shop B', itemName: 'Item 3', count: 1, price: 50, totalPrice: 50 },
    { id: 4, image: Image, shopName: 'Shop C', itemName: 'Item 4', count: 1, price: 50, totalPrice: 50 },
  ];

  const [items, setItems] = useState(initialItems);

  const plusCount = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, count: item.count + 1, totalPrice: (item.count + 1) * item.price } : item
      )
    );
  };

  const minusCount = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.count > 1
          ? { ...item, count: item.count - 1, totalPrice: (item.count - 1) * item.price }
          : item
      )
    );
  };

  return (
    <div className="cartMain">
      <div>
        <p className="title">Shopping Cart</p>
      </div>
      <div className="Cart">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <div>
                  <img className="producticon" src={item.image} alt="producticon" />
                  <br />
                  <label className="shopinfo">{item.shopName}</label>
                  <br />
                  <div class="totalprice">
                      <label className="price">${item.totalPrice}</label>
                    </div>
                  <div class="qtybutton">
                    <button onClick={() => minusCount(item.id)}>-</button>
                    {item.count}
                    <button onClick={() => plusCount(item.id)}>+</button>
                  </div>
 
                  <br />
                  <label className="itemname">{item.itemName}</label>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
