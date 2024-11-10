import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Option = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    // Assuming you have the user ID from context or a higher component
    const userId = 'user-id-placeholder'; // Replace with actual user ID

    const handleOptionChange = (event) => {``
        setSelectedOption(event.target.value);
    };

    const handleApply = async () => {
        try {
            if (selectedOption === 'serviceProvider') {
                // Update is_SP in the backend
                await axios.put(`http://localhost:4002/customers/${userId}`, {
                    is_SP: true
                });
            }

            if (selectedOption === 'customer') {
                navigate('/'); // Redirect to home page for customers
            } else if (selectedOption === 'serviceProvider') {
                navigate('/becomeSP'); // Redirect to the service provider page
            }

            // Close the modal after navigation
            onClose();
        } catch (error) {
            console.error('Error updating is_SP:', error);
        }
    };

    return (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-20'>
            <div className='relative w-full md:max-w-2xl lg:max-w-4xl h-full max-h-[90vh] md:max-h-[90vh] lg:max-h-[90vh] bg-white rounded-lg p-6 flex flex-col items-center'>
                <button
                    className='absolute top-4 right-4 font-extrabold text-gray-500 hover:text-gray-700 text-2xl'
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className='text-2xl font-bold mb-4 text-center text-gray-900'>
                    Join Us As
                </h2>
                <div className='flex flex-col md:flex-row gap-6 mb-6'>
                    {/* Customer Image and Label */}
                    <div className='flex flex-col items-center'>
                        <img 
                            src='https://tse2.mm.bing.net/th?id=OIP.gjc2LZ8qXnCAUkZWcCOVCgHaHa&pid=Api&P=0&h=180' 
                            alt='Customer' 
                            className='w-32 h-32 rounded-full object-cover mb-2'
                        />
                        <label className='flex items-center'>
                            <input
                                type='radio'
                                name='role'
                                value='customer'
                                checked={selectedOption === 'customer'}
                                onChange={handleOptionChange}
                                className='mr-2'
                            />
                            <span className='ml-2 text-gray-900 font-medium'>Customer</span>
                        </label>
                    </div>

                    {/* Service Provider Image and Label */}
                    <div className='flex flex-col items-center'>
                        <img 
                            src='https://static.vecteezy.com/system/resources/previews/023/277/068/non_2x/mechanic-avatar-icon-illustration-vector.jpg' 
                            alt='Service Provider' 
                            className='w-32 h-32 rounded-full object-cover mb-2'
                        />
                        <label className='flex items-center'>
                            <input
                                type='radio'
                                name='role'
                                value='serviceProvider'
                                checked={selectedOption === 'serviceProvider'}
                                onChange={handleOptionChange}
                                className='mr-2'
                            />
                            <span className='ml-2 text-gray-900 font-medium'>Service Provider</span>
                        </label>
                    </div>
                </div>
                {selectedOption && (
                    <button 
                        onClick={handleApply} // Call handleApply on button click
                        className='mt-4 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700'
                    >
                        {selectedOption === 'customer' ? 'Apply as a Customer' : 'Apply as a Service Provider'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Option;
