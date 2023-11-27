import React from 'react';
import '../styles/home.css'
const Home = () => {
  return (
    <div>
      <img className="bannerImage" src="https://unsplash.it/1440/350?random" alt="https://unsplash.it/1440/325?random" />
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
