import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.jsx";
import Products from './components/Products.jsx';
import Signup from "./components/Signup.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        // Perform authentication logic and set isAuthenticated to true upon successful login
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Products />
                        ) : (
                            <Login onLogin={handleLogin} />
                        )
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;