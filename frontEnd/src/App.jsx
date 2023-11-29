import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.jsx";
import Products from './components/Products.jsx';
import Signup from "./components/Signup.jsx";
import Home from './components/Home.jsx';
import AllShops from './components/AllShops.jsx';
import Cart from './components/Cart.jsx';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                            <Products />
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

            </Routes>
        </Router>
    );
}

export default App;