'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';




// Define the context
 const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}



// AuthProvider component to wrap around components that need access to auth context
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [auth, setAuth] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

 

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                console.log('No token found, skipping fetch.');
                setLoading(false);
                return;
            }

            try {
                console.log('Fetching user with token:', token);
                const response = await axios.get('http://localhost:3001/auth/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('API response:', response);
                setAuth(response.data[0]);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchUser();
    }, [token]);

    const login = (userData) => {
        setToken(userData.token);
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        setAuth(null);
        setToken(null);
        localStorage.removeItem('token');
        
    };

    

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading, error, token }}>
            {children}
        </AuthContext.Provider>
    );
}
