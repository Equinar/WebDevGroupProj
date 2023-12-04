import React, { useState } from 'react';
import '../styles/allshops.css'
import Image from '../assets/logo.jpg'

const AllShops = () => {
  const initialItems = [
    { id: 1, image: Image, shopName: 'Shop A', owner: 'owner1' },
    { id: 2, image: Image, shopName: 'Shop B', owner: 'owner2' },
    { id: 3, image: Image, shopName: 'Shop C', owner: 'owner3' },
    { id: 4, image: Image, shopName: 'Shop D', owner: 'owner4' },
    { id: 5, image: Image, shopName: 'Shop E', owner: 'owner4' },
  ];

  const [items, setItems] = useState(initialItems);

  return (

    <div class="main">
      <div><p class="title">Shop List</p>
      </div>
      <div class="shoplist">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <img className="shopicon" src={item.image} alt="shopicon" />
              <br></br>
              <label class="shopinfo">{item.shopName}</label>
              <br></br>
              <br></br>
              <label class="ownername">{item.owner}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllShops;





