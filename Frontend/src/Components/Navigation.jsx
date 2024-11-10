import React, { useState, useEffect, useRef } from 'react';
import BWlogo from '../assets/BWlogo.jpg';
import { Link, useLocation } from 'react-router-dom';
import DialogBox from './DialogBox';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate=useNavigate();


    

    // Toggle between login and signup form
    const toggleForm = () => setIsLoginForm(!isLoginForm);
    // Close the dialog
    const closeDialog = () => setIsNavOpen(false);

    // Handle user logout
    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/')
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setDropdownOpen(false);
    }, [location]);

    // Get user initials
    const userInitials = currentUser?.U_Name?.charAt(0) || '';

    return (
        <div className='bg-black flex items-center h-24 md:h-20 lg:h-18 sticky top-0 z-10 px-3 text-lg text-white'>
            {/* Mobile view container */}
            <div className='lg:hidden flex items-center w-full'>
                <div className='text-3xl cursor-pointer' onClick={() => setIsNavOpen(!isNavOpen)}>
                    {isNavOpen ? <span>&times;</span> : <span>&#9776;</span>}
                </div>

                {/* Logo */}
                <div className='flex-1 flex ml-4'>
                    <img src={BWlogo} alt="Logo" className='h-20' />
                </div>

                {/* Login button or User icon */}
                {currentUser ? (
                    <div className='flex items-center ml-4 relative'>
                        <div 
                            className='flex items-center justify-center w-8 h-8 bg-gray-600 text-white rounded-full cursor-pointer' 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            ref={dropdownRef}
                        >
                            {userInitials}
                        </div>
                        {dropdownOpen && (
                            <div className='absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg' ref={dropdownRef}>
                                <ul className='list-none p-2'>
                                    <li className='p-2 hover:bg-gray-200'>
                                        <Link to='/profile'>My Profile</Link>
                                    </li>
                                    <li className='p-2 hover:bg-gray-200'>
                                        <Link to='/settings'>Settings</Link>
                                    </li>
                                    <li className='p-2 hover:bg-gray-200 cursor-pointer' onClick={handleLogout}>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => setIsNavOpen(true)} className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-4'>
                        Log In
                    </button>
                )}
            </div>

            {/* Desktop view */}
            <div className='hidden lg:flex items-center w-full'>
                <div className='flex-shrink-0'>
                    <img src={BWlogo} alt="Logo" className='h-20' />
                </div>
                <div className='flex flex-1 justify-end items-center mx-4'>
                    <ul className='flex gap-5 list-none mx-4'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link>About Us</Link></li>
                        <li><Link to='/services'>Services</Link></li>

                        {/* Show "Orders" and "Become a Servicer" based on user login and is_SP status */}
                        {currentUser && (
                            <>
                                <li><Link to='/orders'>Orders</Link></li>
                                {!currentUser.is_SP && (
                                    <li><Link to="/becomeSP">Become a Servicer</Link></li>
                                )}
                            </>
                        )}
                    </ul>
                    {currentUser ? (
                        <div className='relative flex items-center'>
                            <div 
                                className='flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full cursor-pointer' 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                ref={dropdownRef}
                            >
                                {userInitials}
                            </div>
                            {dropdownOpen && (
                                <div className='absolute top-12 right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg' ref={dropdownRef}>
                                    <ul className='list-none p-2'>
                                        <li className='p-2 hover:bg-gray-200'>
                                            <Link to='/profile'>My Profile</Link>
                                        </li>
                                        <li className='p-2 hover:bg-gray-200'>
                                            <Link to='/settings'>Settings</Link>
                                        </li>
                                        <li className='p-2 hover:bg-gray-200 cursor-pointer' onClick={handleLogout}>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={() => setIsNavOpen(true)} className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700'>
                            Log In
                        </button>
                    )}
                </div>
            </div>

            {/* Form Dialog */}
            <DialogBox
                isOpen={isNavOpen}
                closeDialog={closeDialog}
                isLoginForm={isLoginForm}
                toggleForm={toggleForm}
            />
        </div>
    );
};

export default Navigation;
