import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import Image from '../assets/logo.jpg';
import Bin from '../assets/profile/bin.png';
import Edit from '../assets/profile/edit.png';
import { useNavigate, Link } from 'react-router-dom';


const Profile = () => {
  const initialItems = [
    { id: 1, image: Image, account: 'Account Name', email: 'Email', joinDate: 'MM-DD-YYYY' },
  ];
  const orderItems = [
    { id: '#000001' },
  ];

  const [items, setItems] = useState(initialItems);
  const [orders, setOrders] = useState(orderItems);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userJoinDate, setUserJoinDate] = useState('');


  const navigateEditProfile = useNavigate();
  const handleGoEditProfile = () => {
    // Navigate to the edit profile page
    navigateEditProfile('/editProfile');
  };

  const userId = localStorage.getItem('userId');
  const handleDeleteUser = () => {
    fetch('http://localhost:3000/api/users/' + userId, {
      method: 'DELETE',
      header: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
            .then((data) => {
                alert('Delete Successfully');
                navigateEditProfile('/');
            })
            .catch((error) => console.error('Updated Error.', error));
  };

  useEffect(() => {
    // Retrieve user name from local storage
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName);
    const storedUserEmail = localStorage.getItem('userEmail');
    setUserEmail(storedUserEmail);
    const storedUserJoinDate = localStorage.getItem('userJoinDate');
    setUserJoinDate(storedUserJoinDate);
  }, []);



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
              <label className="accountName text-2xl">Name: {userName}</label>
              <br />
              <div className="profilebtn">
                <button onClick={(handleGoEditProfile)}>
                  <img className="h-4 w-auto cursor-pointer" src={Edit} alt="editIcon" title="Edit Profile" />
                </button>
                <button onClick={(handleDeleteUser)}>
                  <img className="h-4 w-auto cursor-pointer" src={Bin} alt="binIcon" title="Delete Profile" />
                </button>
              </div>
              <br />
              <label className="email text-2xl">Email: {userEmail}</label>
            </div>
            <br />
            <br />
            <hr className='profilehr'></hr>
            <br />
            <div>
              <label className="joinDate text-2xl">Joined us since: {userJoinDate}</label>
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
