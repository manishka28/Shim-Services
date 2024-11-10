import React from 'react';
import Carousel2 from './Carousel2';

const Hero = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-between bg-cover bg-center p-6"
      style={{ backgroundImage: "url('https://www.welcomesite.com.au/wp-content/uploads/2018/01/construction-tools-dark-background.jpg')" }}
    >
      {/* Text Section */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 space-y-6 text-white">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          Taking <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Home Services</span> to New Heights of Excellence
        </h1>
        <p className="text-lg md:text-xl">
          Your reliable partner for expert home services, offering convenience and peace of mind with every repair and maintenance task.
        </p>
        <button className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 md:px-6 rounded-md transition duration-300">
          Explore
        </button>
      </div>

      {/* Carousel Section */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <div className="w-full md:w-4/5">
          <Carousel2 />
        </div>
      </div>
    </div>
  );
};

export default Hero;
