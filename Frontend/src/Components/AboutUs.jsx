import React from "react";
import { FaStar } from 'react-icons/fa';
import manishka from '../assets/manishka.jpg';
import shruti from '../assets/shruti2.jpg';
import tardej from '../assets/tardej.jpg';
import isha from '../assets/isha.jpg';
import vishal from '../assets/vishal.jpg';
const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* Spacer for Navbar */}
      <div className="h-[var(--navbar-height)]"></div>

      {/* About Us Section */}
      <div className="relative w-full h-[50vh]">
        <img
          src="https://i.pinimg.com/564x/12/b6/b1/12b6b129563594dd352f066bcad673d5.jpg"
          alt="About Us Background"
          className="absolute w-full h-full object-cover"
        />
        
        {/* Black Blur Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 "></div>

        {/* About Us Text */}
        <div className="absolute inset-0 flex flex-col items-start justify-center pl-20">
          <h1 className="text-white text-4xl font-extrabold mb-2">About Us</h1>
          <h3 className="text-gray-400 font-bold text-2xl opacity-80">Connecting Homes with Quality Service</h3>
        </div>
      </div>

      {/* Rated 5 Stars Tagline with Star Icons */}
      <div className="flex justify-center items-center py-8 bg-gray-800 bg-opacity-60">
        <div className="flex items-center space-x-2 text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          <span className="text-lg font-semibold text-white">Recognized as the Top Service Provider of the Year! </span>
          <div className="flex text-yellow-400 space-x-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 text-gray-700 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h2 className="text-3xl font-semibold mb-4">Who We Are?</h2>
          <p className="text-lg leading-relaxed mb-6">
            Welcome to ShimServices, your reliable home service provider. We bring years of experience and a passion for quality service to ensure your satisfaction. Our mission is to connect homes with skilled professionals who make everyday tasks easier and hassle-free.
          </p>
        </div>
        <img
          src="https://i.pinimg.com/474x/ba/52/08/ba52081b8b4cf0eb64576103ef713175.jpg"
          alt="About Us"
          className="w-full lg:w-1/3 rounded-lg shadow-lg"
        />
      </div>

      {/* Service Highlights Section */}
      <div className="bg-gray-100 py-16">
        {/* Card Container */}
        <div className="flex flex-wrap justify-center items-center gap-8 px-4 md:px-0">
          {/* Card 1 */}
          <div className="w-80 h-60 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-6 relative">
            <img
              src="https://i.pinimg.com/564x/49/8e/39/498e39eac6b43ebffa1ff6106fe7f35a.jpg"
              alt="Icon"
              className="absolute top-2 right-2 w-12 h-12 border-2 border-white"
            />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Experience & Expertise</h3>
            <p className="text-gray-600">Our skilled professionals bring years of experience and deep expertise to every service. Your satisfaction is our top priority</p>
          </div>

          {/* Card 2 */}
          <div className="w-80 h-60 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-6 relative">
            <img
              src="https://i.pinimg.com/564x/44/b5/77/44b577dda0a1bcc90ed4db43e88aa08c.jpg"
              alt="Icon"
              className="absolute top-2 right-2 w-12 h-12 border-2 border-white"
            />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Reliability</h3>
            <p className="text-gray-600">Trust in our dependable services that make your life simpler and worry-free. Handle a full renovation project, we've got you covered</p>
          </div>

          {/* Card 3 */}
          <div className="w-80 h-60 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-6 relative">
            <img
              src="https://i.pinimg.com/474x/57/fe/41/57fe41bc2c2ef1c97ba1abee25a358be.jpg"
              alt="Icon"
              className="absolute top-2 right-2 w-12 h-12 border-2 border-white"
            />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Comprehensive Services</h3>
            <p className="text-gray-600">From repairs to cleaning, we cover a wide range of services to meet your needs. We believe in offering a one-stop solution for all your home service needs. Our team is equipped.</p>
          </div>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs1IlvzBOirv8peZRW0OU_48s708XWglYM1Q&s')" }}>
        {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h2 className="text-white text-4xl font-bold mb-6">Meet Our Team</h2>
          
          {/* Team Cards */}
          <div className="flex gap-14">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src={manishka}
                alt="Team Member 1"
                className="w-36 h-36 rounded-full mb-4"
              />
              <p className="text-white text-xl font-bold">Manishka Gupta</p>
              <p className="text-white font-semibold text-lg">Project Head</p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src={shruti}
                alt="Team Member 2"
                className="w-36 h-36 rounded-full mb-4"
              />
              <p className="text-white text-xl font-bold">Shruti Chaurasia</p>
              <p className="text-white text-lg font-semibold">Backend Developer</p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src={tardej}
                alt="Team Member 3"
                className="w-36 h-36 rounded-full mb-4"
              />
              <p className="text-white text-xl font-bold">Tardej Tudu</p>
              <p className="text-white text-lg font-semibold">Designer</p>
            </div>
            
            {/* Team Member 4 */}
            <div className="text-center">
              <img
                src={isha}
                alt="Team Member 4"
                className="w-36 h-36 rounded-full mb-4"
              />
              <p className="text-white text-xl font-bold">Isha Doifode</p>
              <p className="text-white text-lg font-semibold">Frontend Developer</p>
            </div>
            
            {/* Team Member 5 */}
            <div className="text-center">
              <img
                src={vishal}
                alt="Team Member 5"
                className="w-36 h-36 rounded-full mb-4"
              />
              <p className="text-white text-xl font-bold">Vishal Sahu</p>
              <p className="text-white text-lg font-semibold">Database Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
