import React, { useState, useEffect, useRef } from 'react';
import BWlogo from '../assets/BWlogo.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DialogBox from './DialogBox';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false); // Renamed for login-specific state
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const dropdownRef = useRef(null);
    const ordersDropdownRef = useRef(null);
    const loginDropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [loginRole, setLoginRole] = useState({ isAdmin: false });

    // Toggle between login and signup form
    const toggleForm = () => setIsLoginForm(!isLoginForm);
    const closeDialog = () => setIsNavOpen(false);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/');
    };

    const handleOrderSelect = (orderType) => {
        setSelectedStatus(orderType);
        navigate('/orders', { state: { selectedStatus: orderType } });
        setOrdersDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
                setLoginDropdownOpen(false);
            }
            if (ordersDropdownRef.current && !ordersDropdownRef.current.contains(event.target)) {
                setOrdersDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsNavOpen(false);
        setDropdownOpen(false);
        setLoginDropdownOpen(false);
        setOrdersDropdownOpen(false);
    }, [location]);

    const userInitials = currentUser?.U_Name?.charAt(0) || '';

    // console.log("Login Open",isLoginOpen);
    const navLinks = [
        { text: 'Home', to: '/' },
        { text: 'About', to: '/aboutUs' },
        { text: 'Services', to: '/services' }
    ];
    // Close navigation menu when clicking outside
    
    return (
        <div className='bg-black flex items-center h-24 md:h-20 lg:h-18 sticky top-0 z-10 px-3 text-lg text-white'>
            {/* Mobile View  */}
            <div className='lg:hidden flex items-center w-full'>
    <div className='text-3xl cursor-pointer' 
    onTouchStart={() => setIsNavOpen(!isNavOpen)} 
        style={{
            fontSize: '2.5rem', // Increase size of the icons
            lineHeight: '1',
            padding: '10px',
        }}>
        {isNavOpen ? <span>&times;</span> : <span>&#9776;</span>}
    </div>

    <div className='flex-1 flex ml-4'>
        <img src={BWlogo} alt="Logo" className='h-20' />
    </div>
    {/* Display the navigation menu when isNavOpen is true */}
 {isNavOpen && (
    <div className='absolute top-16 left-0 w-1/2 bg-black bg-opacity-90 shadow-lg border-t border-gray-200 rounded-lg' >
        <ul className='flex flex-col items-center'>
    {navLinks.map((link, index) => (
        <li key={index} className='w-1/2'>
            <Link 
                to={link.to} 
                className='block text-white py-3 px-4 text-center transition duration-300 ease-in-out border-t border-gray-200'
                onClick={() => setIsNavOpen(false)} // Close the menu when a link is clicked
            >
                {link.text}
            </Link>
        </li>
    ))}
    {!currentUser.is_SP && (
                <li className='w-1/2'>
                    <Link 
                        to="/becomeSP" 
                        className='block text-white py-3 px-4 text-center hover:bg-gray-100 hover:text-green-600 transition duration-300 ease-in-out border-t border-gray-200'
                        onClick={() => setIsNavOpen(false)} // Close the menu when clicked
                    >
                        Become a Servicer
                    </Link>
                </li>
            )}
    {currentUser && (
        <>
            <li className="w-1/2 relative" ref={ordersDropdownRef}>
                <span
                    onClick={() => setOrdersDropdownOpen(!ordersDropdownOpen)}
                    className="block text-white py-3 px-4 text-center cursor-pointer transition duration-300 ease-in-out border-t border-gray-200"
                >
                    Orders
                </span>
                {ordersDropdownOpen && (
                    <div className="relative right-0 w-40 ml-8 bg-black text-white rounded-md shadow-lg">
                        {/* <hr></hr> */}
                        <ul className="list-none p-2">
                            <li
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleOrderSelect('Pending')}
                            >
                                Pending
                            </li>
                            <li
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleOrderSelect('Scheduled')}
                            >
                                Scheduled
                            </li>
                            <li
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleOrderSelect('Completed')}
                            >
                                Completed
                            </li>
                        </ul>
                    </div>
                )}
            </li>
            
        </>
    )}
</ul>

    </div>
)}




    {currentUser ? (
        <div className='flex items-center ml-4 relative'>
            <div 
                className='flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full cursor-pointer' 
                onClick={() => {
                    // console.log("Profile icon touched");
                    setDropdownOpen(!dropdownOpen);
                }}
                ref={dropdownRef}
            >
                {userInitials}
            </div>
            {dropdownOpen && (
                <div className='absolute right-2 top-6 mt-2 w-48 bg-white text-black rounded-md shadow-lg' ref={dropdownRef}>
                    <ul className='list-none p-2'>
                        <li className='p-2 hover:bg-gray-200'>
                            <button onTouchStart={()=> {navigate('/profile')}}>
                                My Profile
                            </button>
                        </li>
                        <li className='p-2 hover:bg-gray-200'>
                            <Link to='/settings'>
                                Settings
                            </Link>
                        </li>
                        <li className='p-2 hover:bg-gray-200 cursor-pointer' onTouchStart={handleLogout}>
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    ) : (
        <div className='relative'>
            <button
                onClick={() => {
                    // console.log("Login touched");
                    setLoginDropdownOpen(!loginDropdownOpen);
                }}
                className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-4 '
            >
                Log In
            </button>

            {loginDropdownOpen && (
                <div 
                    className='absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg'
                    ref={loginDropdownRef}
                >
                    <ul className='list-none p-2'>
                        <li>
                            <button
                                style={{ pointerEvents: 'auto' }}
                                className='w-full p-2 text-left hover:bg-gray-200 cursor-pointer'
                                onTouchStart={(e) => {
                                    e.stopPropagation();
                                    // console.log("Login as User touched");
                                    setLoginRole({ isAdmin: false });
                                    setIsLoginOpen(true);
                                }}
                            >
                                Login as User
                            </button>
                        </li>
                        <li>
                            <button
                                className='w-full p-2 text-left hover:bg-gray-200 cursor-pointer'
                                onTouchStart={() => {
                                    // console.log("Login as Admin touched");
                                    setLoginRole({ isAdmin: true });
                                    setIsLoginOpen(true);
                                }}
                            >
                                Login as Admin
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )}
</div>


            {/* Desktop View  */}

            <div className='hidden lg:flex items-center w-full'>
                <div className='flex-shrink-0'>
                    <img src={BWlogo} alt="Logo" className='h-20' />
                </div>
                <div className='flex flex-1 justify-end items-center mx-4'>
                    <ul className='flex gap-5 list-none mx-4'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/aboutUs'>About Us</Link></li>
                        <li><Link to='/services'>Services</Link></li>

                        {currentUser && (
                            <>
                                <li ref={ordersDropdownRef} className="relative">
                                    <span
                                        onClick={() => setOrdersDropdownOpen(!ordersDropdownOpen)}
                                        className="cursor-pointer"
                                    >
                                        Orders
                                    </span>
                                    {ordersDropdownOpen && (
                                        <div className="absolute mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                                            <ul className="list-none p-2">
                                                <li
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => handleOrderSelect('Pending')}
                                                >
                                                    Pending
                                                </li>
                                                <li
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => handleOrderSelect('Scheduled')}
                                                >
                                                    Scheduled
                                                </li>
                                                <li
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => handleOrderSelect('Completed')}
                                                >
                                                    Completed
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
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
                        <div className='relative'>
                            <button
                                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                                className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-4'
                            >
                                Log In
                            </button>

                            {loginDropdownOpen && (
                                <div
                                    className='absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg'
                                    ref={loginDropdownRef}
                                >
                                    <ul className='list-none p-2'>
                                        <li
                                            className='p-2 hover:bg-gray-200 cursor-pointer'
                                            onClick={() => {
                                                // console.log("Login as User clicked");
                                                setLoginRole({ isAdmin: false });
                                                setIsLoginOpen(true); // Only set login state here
                                            }}
                                        >
                                            Login as User
                                        </li>
                                        <li
                                            className='p-2 hover:bg-gray-200 cursor-pointer'
                                            onClick={() => {
                                                setLoginRole({ isAdmin: true });
                                                setIsLoginOpen(true); // Only set login state here
                                            }}
                                        >
                                            Login as Admin
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <DialogBox
                isOpen={isLoginOpen} // Pass isLoginOpen state to DialogBox
                closeDialog={() => setIsLoginOpen(false)} // Close the dialog only for login
                isLoginForm={isLoginForm}
                toggleForm={toggleForm}
                loginRole={loginRole}
            />
        </div>
    );
};

export default Navigation;
