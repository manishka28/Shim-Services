import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = ({ onSwitchToLogin, closeDialog }) => {
    const [signupValues, setSignupValues] = useState({
        email: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        phone: '',
        isSP: false,
    });
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignupValues((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrorMessages((prev) => ({ ...prev, [name]: '' }));
    };

    const validateFields = () => {
        const { email, fullname, password, confirmPassword, phone } = signupValues;
        let errors = {};

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/@gmail\.com$/.test(email)) {
            errors.email = 'Email must be in the form @gmail.com';
        }

        // Full name validation
        if (!fullname) {
            errors.fullname = 'Full name is required';
        }

        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 8 || password.length > 31) {
            errors.password = 'Password must be between 8 and 31 characters';
        } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
            errors.password = 'Password must contain an alphabet, a number, and a special character';
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        // Phone number validation
        if (!phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phone)) {
            errors.phone = 'Phone number must be 10 digits';
        }

        setErrorMessages(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignUp = async () => {
        if (!validateFields()) return;

        const { email, fullname, password, phone, isSP } = signupValues;

        try {
            const response = await fetch('http://localhost:4002/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    U_Email: email,
                    U_Name: fullname,
                    U_Password: password,
                    U_Phone: `+91${phone}`, // Phone number with prefix
                    is_SP: isSP,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                const user = {
                    U_Email: email,
                    U_Name: fullname,
                    U_Password: password,
                    U_Phone: `+91${phone}`,
                    is_SP: isSP ? 1 : 0,
                };
                signup(user);

                setSuccessMessage('Account created successfully');
                setErrorMessages({});
                setTimeout(() => {
                    closeDialog();
                    navigate(isSP ? '/becomeSP' : '/');
                }, 1000);
            } else {
                setErrorMessages({ general: result.error || 'Error occurred during signup' });
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessages({ general: 'Failed to sign up. Please try again later.' });
            setSuccessMessage('');
        }
    };

    return (
        <div className='flex items-center justify-center w-full p-6'>
            <div className='flex flex-col w-full max-w-md bg-white rounded-lg'>
                <h2 className='text-2xl font-bold mb-2 text-center text-gray-900'>
                    Create Account
                </h2>
                <form className='flex flex-col gap-2'>
                    <input
                        type="email"
                        name="email"
                        value={signupValues.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className={`p-3 border ${
                            errorMessages.email ? 'border-red-600' : 'border-gray-300'
                        } rounded text-black text-sm w-full`}
                    />
                    {errorMessages.email && <p className='text-red-600 text-sm'>{errorMessages.email}</p>}
                    <input
                        type="text"
                        name="fullname"
                        value={signupValues.fullname}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className={`p-3 border ${
                            errorMessages.fullname ? 'border-red-600' : 'border-gray-300'
                        } rounded text-black text-sm w-full`}
                    />
                    {errorMessages.fullname && <p className='text-red-600 text-sm'>{errorMessages.fullname}</p>}
                    <input
                        type="password"
                        name="password"
                        value={signupValues.password}
                        onChange={handleInputChange}
                        placeholder="Create Password"
                        className={`p-3 border ${
                            errorMessages.password ? 'border-red-600' : 'border-gray-300'
                        } rounded text-black text-sm w-full`}
                    />
                    {errorMessages.password && <p className='text-red-600 text-sm'>{errorMessages.password}</p>}
                    <input
                        type="password"
                        name="confirmPassword"
                        value={signupValues.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        className={`p-3 border ${
                            errorMessages.confirmPassword ? 'border-red-600' : 'border-gray-300'
                        } rounded text-black text-sm w-full`}
                    />
                    {errorMessages.confirmPassword && (
                        <p className='text-red-600 text-sm'>{errorMessages.confirmPassword}</p>
                    )}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value="+91"
                            readOnly
                            className="p-3 border border-gray-300 rounded text-black text-sm bg-gray-100 w-16 cursor-not-allowed"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={signupValues.phone}
                            onChange={handleInputChange}
                            placeholder="Phone No."
                            className={`p-3 border ${
                                errorMessages.phone ? 'border-red-600' : 'border-gray-300'
                            } rounded text-black text-sm w-full`}
                        />
                    </div>
                    {errorMessages.phone && <p className='text-red-600 text-sm'>{errorMessages.phone}</p>}
                    <div className='flex items-center'>
                        <input
                            type="checkbox"
                            name="isSP"
                            checked={signupValues.isSP}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <label className='text-gray-700'>Are you a Service Provider?</label>
                    </div>
                    {errorMessages.general && <p className='text-red-600 text-sm'>{errorMessages.general}</p>}
                    {successMessage && <p className='text-green-600 text-sm'>{successMessage}</p>}
                    <button
                        type='button'
                        onClick={handleSignUp}
                        className='bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm w-full'
                    >
                        Sign Up
                    </button>
                    <p className='mt-4 text-sm text-center text-gray-700'>
                        Already have an account?
                        <span onClick={onSwitchToLogin} className='text-blue-600 cursor-pointer'> Log In</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
