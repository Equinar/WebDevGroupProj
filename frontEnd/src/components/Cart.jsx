import React from 'react';
import '../styles/cart.css'
import Image from '../assets/logo.jpg'

const Cart = () => {
  return (

    <div class="main">
      <div><p class="title">Shopping Cart</p>
      </div>
      <div class="Cart">
        <ul>
          <li><img className="producticon" src={Image} alt="product icon" />
            <br></br>
            <label class="shopinfo">Shop name</label>
            <br></br>
            <br></br>
            <label class="itemname">Item name</label>
          </li>
          <li><img className="producticon" src={Image} alt="product icon" />
            <br></br>
            <label class="shopinfo">Shop name</label>
            <br></br>
            <br></br>
            <label class="itemname">Item name</label>
          </li>
          <li><img className="producticon" src={Image} alt="product icon" />
            <br></br>
            <label class="shopinfo">Shop name</label>
            <br></br>
            <br></br>
            <label class="itemname">Item name</label>
          </li>
          <li><img className="producticon" src={Image} alt="product icon" />
            <br></br>
            <label class="shopinfo">Shop name</label>
            <br></br>
            <br></br>
            <label class="itemname">Item name</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
