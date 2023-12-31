import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.jsx";
import Products from './components/Products.jsx';
import Signup from "./components/Signup.jsx";
import Home from './components/Home.jsx';
import Users from './components/Users.jsx';
import AllShops from './components/AllShops.jsx';
import Cart from './components/Cart.jsx';
import Profile from './components/Profile.jsx';
import EditProfile from './components/EditProfile.jsx';
import MyShops from "./components/MyShop.jsx";
import CreateShop from "./components/CreateShop.jsx";
import EditShop from "./components/EditShop.jsx";
import CreateItemForm from './components/CreateItemForm.jsx';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check local storage for authentication token
        const token = localStorage.getItem('token');
        if (token) {
            // Token found, set isAuthenticated to true
            setIsAuthenticated(true);
        }
    }, []);
    
    const handleLogin = () => {
        // Perform authentication logic and set isAuthenticated to true upon successful login
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        // Clear authentication tokens or user info from local storage if any
        localStorage.removeItem('token');
        
        // Update the isAuthenticated state
        setIsAuthenticated(false);
    };


    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated}  onLogout={handleLogout}/>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Home />
                        ) : (
                            <Home />
                        )
                    }
                />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/products" element={<Products />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/allshops" element={<AllShops />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/myshops" element={<MyShops />} />
                <Route path="/editshop/:shopId" element={<EditShop />} />
                <Route path="/createitem/:shopId" element={<CreateItemForm />} />
                <Route path="/create-shop" element={<CreateShop />} />
                {isAuthenticated && <Route path="/users" element={<Users />} setIsAuthenticated={setIsAuthenticated} />}
            </Routes>
        </Router>
    );
}

export default App;
