import React from 'react';
import '../styles/allshops.css'
import Image from '../assets/logo.jpg'

const AllShops = () => {
  return (

    <div class="main">
      <div><p class="title">Shop List</p>
      </div>
      <div class="shoplist">
        <ul>
          <li><img className="shopicon" src={Image} alt="shop icon" />
            <br></br>
            <label class="shopinfo">Shop 1</label>
            <br></br>
            <br></br>
            <label class="ownername">owner</label>
          </li>
          <li><img className="shopicon" src={Image} alt="shop icon" />
            <br></br>
            <label class="shopinfo">Shop 2</label>
            <br></br>
            <br></br>
            <label class="ownername">owner</label>
          </li>
          <li><img className="shopicon" src={Image} alt="shop icon" />
            <br></br>
            <label class="shopinfo">Shop 3</label>
            <br></br>
            <br></br>
            <label class="ownername">owner</label>
          </li>          <li><img className="shopicon" src={Image} alt="shop icon" />
            <br></br>
            <label class="shopinfo">Shop 4</label>
            <br></br>
            <br></br>
            <label class="ownername">owner</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AllShops;





