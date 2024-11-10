import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import bcrypt from 'bcryptjs';


const Login = ({ onSwitchToSignUp, closeDialog }) => {
    const [loginValues, setLoginValues] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { login } = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginValues(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // Fetch customers
            const customerResponse = await fetch('http://localhost:4002/customers');
            const customers = await customerResponse.json();
            console.log('Customers:', customers);  // Log all customer data
    
            // Find matching customer
            const customer = customers.find(c => c.U_Email === loginValues.email);
            console.log('Customer found:', customer);  // Log the found customer object
    
            if (!customer) {
                setErrorMessage('Invalid email or password');
                setSuccessMessage('');
                return;
            }
    
            // Check if the password exists for the customer
            if (!customer.U_Password) {
                throw new Error('Password not found in customer data');
            }
    
            // Compare passwords
            const isMatch = await bcrypt.compare(loginValues.password, customer.U_Password);
            if (isMatch) {
                login(customer);
                setSuccessMessage('Login Successful!');
                setErrorMessage('');
                closeDialog();
            } else {
                setErrorMessage('Invalid email or password');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Failed to login. Please try again.');
            setSuccessMessage('');
        }
    };
    
    

    return (
        <div className='flex items-center justify-center w-full p-6'>
            <div className='flex flex-col w-full max-w-md p-6 bg-white rounded-lg'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-900'>
                    Welcome Back! to SHIM SERVICES
                </h2>
                <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        name="email"
                        value={loginValues.email}
                        onChange={handleInputChange}
                        placeholder="Email" 
                        className="p-3 border text-black border-gray-300 rounded text-sm" 
                        required
                    />
                    <input 
                        type="password" 
                        name="password"
                        value={loginValues.password}
                        onChange={handleInputChange}
                        placeholder="Password" 
                        className="p-3 border text-black border-gray-300 rounded text-sm" 
                        required
                    />
                    {successMessage && (
                        <p className='text-green-500 text-sm'>{successMessage}</p>
                    )}
                    {errorMessage && (
                        <p className='text-red-500 text-sm'>{errorMessage}</p>
                    )}
                    <button type='submit' className='bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm'>
                        Login
                    </button>
                    <p className='mt-4 text-sm text-center text-gray-700'>
                        Don't have an account? 
                        <span onClick={onSwitchToSignUp} className='text-blue-600 cursor-pointer'> Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
