import React, { useState } from 'react';
import '../styles/profile.css';
import Image from '../assets/logo.jpg';
import Bin from '../assets/profile/bin.png';
import Edit from '../assets/profile/edit.png';

const Profile = () => {
  const initialItems = [
    { id: 1, image: Image, account: 'Account Name', email: 'Email', joinDate: 'MM-DD-YYYY' },
  ];
  const orderItems = [
    { id: '#000001' },
  ];

  const [items, setItems] = useState(initialItems);
  const [orders, setOrders] = useState(orderItems);


  return (
    <div className="main">
      <div>
        <p className="title">My Account</p>
      </div>
      <div className="account">
        {items.map((item) => (
          <div key={item.id} className="accountItem">
            <div>
              <img className="accountIcon" src={item.image} alt="accountIcon" />
              <br />
              <label className="accountName">{item.account}</label>
              <br />
              <div className="profilebtn">
                <button onClick={() => handleEdit(item.id)}>
                  <img className="h-4 w-auto cursor-pointer" src={Edit} alt="editIcon" />
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <img className="h-4 w-auto cursor-pointer" src={Bin} alt="binIcon" />
                </button>
              </div>
              <br />
              <label className="email">{item.email}</label>
            </div>
            <br />
            <br />
            <hr></hr>
            <br />
            <div>
              <label className="joinDate">Joined us since: {item.joinDate}</label>
            </div>
          </div>
        ))}
      </div>
      <div className="order">
          <p id="orderTitle">Orders:</p>
        {orders.map((order) => (
          <div key={order.id} className="accountItem">
            <div>
              <label className="accountName">{order.id}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
