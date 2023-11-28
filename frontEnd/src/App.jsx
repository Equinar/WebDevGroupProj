import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.jsx";
import Products from './components/Products.jsx';
import Signup from "./components/Signup.jsx";
import Home from './components/Home.jsx';
import Users from './components/Users.jsx';
import AllShops from './components/AllShops.jsx';
import Cart from './components/Cart.jsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        // Perform authentication logic and set isAuthenticated to true upon successful login
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
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
                <Route path="/login" element={<Login handleLogin={handleLogin} setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/products" element={<Products />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/allshops" element={<AllShops />} />
                <Route path="/cart" element={<Cart />} />
                {isAuthenticated && <Route path="/users" element={<Users />} setIsAuthenticated={setIsAuthenticated} />}
            </Routes>
        </Router>
    );
}

export default App;
