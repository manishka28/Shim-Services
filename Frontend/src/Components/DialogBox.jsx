import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

const DialogBox = ({ isOpen, closeDialog, isLoginForm, toggleForm,loginRole }) => {
    if (!isOpen) return null; // Do not render if dialog is not open
    console.log(loginRole.isAdmin);
    

    return (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-30'>
            <div className='relative w-full md:max-w-2xl lg:max-w-4xl h-full max-h-[90vh] md:max-h-[90vh] lg:max-h-[90vh] flex bg-white overflow-hidden rounded-lg'>
                {/* Close Button */}
                <button
                    className={`absolute top-4 font-extrabold text-gray-500 hover:text-gray-700 text-4xl transition-transform ease-in-out duration-1000 z-40 ${isLoginForm ? 'left-4' : 'right-4'}`}
                    onClick={closeDialog} // Close the dialog box
                >
                    &times;
                </button>

                {/* Container for Image and Form */}
                <div className='relative flex w-full h-full'>
                    {/* Image Section */}
                    <div className={`w-1/2 h-full bg-cover bg-center transition-transform duration-700 ${isLoginForm ? 'translate-x-full' : 'translate-x-0'}`} 
                        style={{ backgroundImage: 'url(https://media.istockphoto.com/id/586932394/photo/home-renovation-and-diy.jpg?s=612x612&w=0&k=20&c=lNlEVW61NptLSTR-hm3It3zAhen5yfODlZofNLEhepg=)' }}>
                    </div>

                    {/* Form Section */}
                    <div className={`w-1/2 h-full flex items-center justify-center transition-transform duration-700 ${isLoginForm ? '-translate-x-full' : 'translate-x-0'}`}>
                        {isLoginForm ? (
                            <Login 
                            onSwitchToSignUp={toggleForm} 
                            closeDialog={closeDialog}
                            isAdmin={loginRole.isAdmin}/>
                        ) : (
                            <SignUp onSwitchToLogin={toggleForm} closeDialog={closeDialog} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialogBox;
