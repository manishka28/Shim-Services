import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [currentAdmin, setCurrentAdmin] = useState(null);

    const loginAdmin = (admin) => {
        // console.log('Logging in Admin Auth:', admin);
        setCurrentAdmin(admin);
    };

    const logoutAdmin = () => {
        // console.log('Logging out Admin');
        setCurrentAdmin(null);
    };

    const signupAdmin = (admin) => {
        // console.log('Signing up Admin:', admin);
        setCurrentAdmin(prevState => 
            prevState ? { ...prevState, ...admin } : admin
        );
    };

    useEffect(() => {
        if (currentAdmin !== null) {
            // console.log('currentAdmin updated:', currentAdmin);
        }
    }, [currentAdmin]);

    return (
        <AdminContext.Provider value={{ currentAdmin, setCurrentAdmin, loginAdmin, logoutAdmin, signupAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAuthAdmin = () => useContext(AdminContext);
