import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (user) => {
        // console.log('Logging in user:', user); // Debug log
        setCurrentUser(user);
    };

    const logout = () => {
        // console.log('Logging out user'); // Debug log
        setCurrentUser(null);
    };

    const signup = (user) => {
        // console.log('Signing up user:', user); // Debug log
        setCurrentUser(user);
    };

    return (
        <AuthContext.Provider value={{ currentUser,setCurrentUser, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
