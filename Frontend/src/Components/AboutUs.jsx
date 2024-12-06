import React from "react";
import { FaStar } from 'react-icons/fa';
import manishka from '../assets/manishka.jpg';
import shruti from '../assets/shruti2.jpg';
import tardej from '../assets/tardej.jpg';
import isha from '../assets/isha.jpg';
import vishal from '../assets/vishal.jpg';
import Contact from "./Contact";

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
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold mb-2">About Us</h1>
          <h3 className="text-gray-400 font-bold text-xl md:text-2xl opacity-80">Connecting Homes with Quality Service</h3>
        </div>
      </div>

      {/* Rated 5 Stars Tagline with Star Icons */}
      <div className="flex flex-col md:flex-row justify-center items-center py-8 bg-gray-800 bg-opacity-60">
        <div className="flex items-center space-x-2 text-yellow-400">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <span className="text-lg font-semibold text-white text-center md:mx-4">
          Recognized as the Top Service Provider of the Year!
        </span>
        <div className="flex items-center space-x-2 text-yellow-400">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Who We Are?</h2>
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
        <div className="flex flex-wrap justify-center items-center gap-8 px-4 md:px-8">
          {/* Cards */}
          {[
            {
              title: "Experience & Expertise",
              description: "Our skilled professionals bring years of experience and deep expertise to every service.",
              img: "https://i.pinimg.com/564x/49/8e/39/498e39eac6b43ebffa1ff6106fe7f35a.jpg",
            },
            {
              title: "Reliability",
              description: "Trust in our dependable services that make your life simpler and worry-free.",
              img: "https://i.pinimg.com/564x/44/b5/77/44b577dda0a1bcc90ed4db43e88aa08c.jpg",
            },
            {
              title: "Comprehensive Services",
              description: "From repairs to cleaning, we cover a wide range of services to meet your needs.",
              img: "https://i.pinimg.com/474x/57/fe/41/57fe41bc2c2ef1c97ba1abee25a358be.jpg",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="w-full sm:w-80 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 p-8 relative"
            >
              <img
                src={card.img}
                alt="Icon"
                className="absolute top-2 right-2 w-12 h-12 border-2 border-white"
              />
              <h3 className="text-xl font-bold text-gray-700 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="bg-cover bg-center py-16" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs1IlvzBOirv8peZRW0OU_48s708XWglYM1Q&s')" }}>
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-14 px-4 md:px-8">
          {[
            { name: "Manishka Gupta", role: "Project Head", img: manishka },
            { name: "Shruti Chaurasia", role: "Backend Developer", img: shruti },
            { name: "Tardej Tudu", role: "UI Designer", img: tardej },
            { name: "Isha Doifode", role: "Frontend Developer", img: isha },
            { name: "Vishal Sahu", role: "Database Designer", img: vishal },
          ].map((member, index) => (
            <div key={index} className="text-center w-36">
              <img
                src={member.img}
                alt={member.name}
                className="w-36 h-36 rounded-full mb-4 shadow-lg"
              />
              <p className="text-white text-xl font-extrabold">{member.name}</p>
              <p className="text-white text-lg font-bold">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default AboutUs;
