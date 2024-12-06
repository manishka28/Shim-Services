import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhoneAlt, FaChevronRight } from 'react-icons/fa';
import img from '../assets/BWlogo.jpg'
import Contact from './Contact';
const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between">
        
        {/* About Us Section */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h2 className="text-xl font-bold mb-4">
            <img className='w-36 h-15' src={img}/>
          </h2>
          <p>
            We are a trusted company providing a wide range of services including home repairs, cleaning, and maintenance. Our aim is to offer efficient and affordable solutions to all your home service needs.
          </p>
        </div>

        {/* Centered Quick Links Section */}
        <div className="mb-6 md:mb-0 md:w-1/3 md:text-center">
  <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
  <ul className="space-y-2 flex flex-col md:items-center md:text-center">
    {[
      { name: 'Home', href: '#' },
      { name: 'About Us', href: '#' },
      { name: 'Services', href: '#' },
      { name: 'Contact Us', href: '#' },
    ].map((link, index) => (
      <li key={index} className="relative group flex items-center text-center">
        <a href={link.href} className="flex space-x-2 hover:text-gray-300 transition-all duration-200">
          <FaChevronRight className="text-white group-hover:text-yellow-400 transition duration-200 transform group-hover:translate-x-1" />
          <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-gray-300 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
            {link.name}
          </span>
        </a>
      </li>
    ))}
  </ul>
</div>


        {/* Contact Information Section */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p>Maulana Azad National Institute of Technology, Bhopal, Madhya Pradesh, India</p>
          <div className="flex flex-col space-y-2 mt-2">
            <p className="text-sm">
              <FaEnvelope className="inline mr-2" />
              Email: <a href="mailto:info@example.com" className="hover:text-yellow-400">shimservices5@gmail.com</a>
            </p>
            <p className="text-sm">
              <FaPhoneAlt className="inline mr-2" />
              Phone: <a href="tel:+1234567890" className="hover:text-yellow-400">+123 456 7890</a>
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition transform hover:scale-110">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition transform hover:scale-110">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        {/* <Contact/> */}
      </div>
    </footer>
  );
};

export default Footer;


