import React from 'react';
import Image from '../assets/bannerHome.jpg'
import '../styles/home.css'
const Home = () => {
  return (
    <div>
      <img className="bannerImage" src= {Image} alt="Black Friday Deals Banner" />
      <div className="bannerText">
        <p>Check out our brand new <b>Black Friday</b> Deals</p>
        <h1><a href='/products'>&gt;</a></h1>
      </div>
      <div className="welcome">
        <p>Welcome to the Brogrammers Marketplace!</p>
      </div>
    </div>
  );
};

export default Home;
