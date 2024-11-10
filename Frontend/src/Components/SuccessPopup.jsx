import React from 'react';

const SuccessPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        
        {/* Image */}
        <img
          src="https://cdn.pixabay.com/photo/2023/04/03/21/34/confetti-7897936_1280.png"
          alt="Celebration confetti"
          className="w-20 h-20 mx-auto mb-4"
        />

        {/* Congratulatory Text */}
        <h1 className="text-2xl font-bold text-green-600 mb-2">Congratulations!</h1>
        <h2 className="text-lg text-gray-700">You're now a service provider at ShimServices</h2>
      </div>
    </div>
  );
};

export default SuccessPopup;
