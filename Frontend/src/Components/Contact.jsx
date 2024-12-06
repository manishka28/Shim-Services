import React, { useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPhone, FaHome } from "react-icons/fa";
import contact from '../assets/contact.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const emailParams = {
      to_name: "Shim Services",
      from_name: formData.from_name,
      reply_to: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_5gom8kt",
        "template_vma568g",
        emailParams,
        "Pdha7F8IBMs58NnWk"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully!", { autoClose: 3000 });
          setFormData({ from_name: "", email: "", message: "" });
        },
        (error) => {
          toast.error("Failed to send the message.", { autoClose: 3000 });
        }
      );
  };

  return (
    <section id="contact" className="py-10 px-5 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
{/* Contact Information */}
<div>
          {/* <h2 className="text-xl text-yellow-600 font-bold uppercase">Contact Us</h2> */}
          <h3 className="text-4xl font-bold text-gray-800 mt-2">
            Get In Touch With Us
          </h3>
          <p className="text-gray-600 mt-4">
          At <strong>Shim Services</strong>, we’re here to assist with your queries, collaborations, or feedback. Reach out via our feedback form, email, or WhatsApp, and our team will respond promptly. Let’s work together to bring your ideas to life!
          </p>
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-500 text-black rounded-full">
                <FaHome size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Our Location
                </h4>
                <p className="text-gray-600">
                  Maulana Azad National Institue of Technology, 
                  <br></br>
                  Bhopal, Madhya Pardesh
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-500 text-black rounded-full">
              <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
                <FaWhatsapp size={24} />
                </a>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Whatsapp
                </h4>
                <p className="text-gray-600">(+91) 1234567890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-500 text-black rounded-full">
              <a
              href="mailto:shimservices5@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              
            >
                <FaEnvelope size={24} />
                </a>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Email Address
                </h4>
                
                <p className="text-gray-600">shimservices5@gmail.com</p>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white  p-8 rounded-lg shadow-lg relative">
        <div className="absolute top-[-20px] right-[-20px]">
        <img
              src={contact}
              className="h-24 w-24 text-yellow-300 rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            />
              {/* <circle cx="12" cy="12" r="10" fill="currentColor" /> */}
          
          </div>
          {/* Contact Form */}
          <form className="space-y-6" onSubmit={sendEmail}>
  <input
    type="text"
    name="from_name"
    placeholder="Your Name"
    className="w-full px-4 py-3 bg-white rounded-md text-gray-700 border-2 border-gray-600 focus:ring-2 focus:ring-yellow-400"
    value={formData.from_name}
    onChange={handleChange}
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Your Email Address"
    className="w-full px-4 py-3 bg-white rounded-md text-gray-700 border-2 border-gray-600 focus:ring-2 focus:ring-yellow-400"
    value={formData.email}
    onChange={handleChange}
    required
  />
  <textarea
    name="message"
    placeholder="Your Message"
    rows={5}
    className="w-full px-4 py-3 bg-white rounded-md text-gray-700 border-2 border-gray-600 focus:ring-2 focus:ring-yellow-400"
    value={formData.message}
    onChange={handleChange}
    required
  ></textarea>
  <button
    className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
    type="submit"
  >
    Send Message
  </button>
</form>


          {/* Contact Details */}
          {/* <div className="flex flex-col gap-7">
            <p className="text-4xl font-bold text-green-700">Get In Touch</p>
            <a
              href="mailto:shimservices5@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 items-center rounded-md shadow-lg py-3 px-6 bg-green-700 text-yellow-400 transition"
            >
              <FaEnvelope size={18} /> shimservices5@gmail.com
            </a>

            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 items-center rounded-md shadow-lg py-3 px-6 bg-green-700 text-yellow-400 transition"
            >
              <FaWhatsapp size={18} /> +91 1234567890
            </a>

            <div className="flex gap-3 items-start rounded-md shadow-lg py-3 px-6 bg-green-700 text-yellow-400 transition">
              <FaLocationPin size={18} />
              <span>
                Maulana Azad National Institute of Technology
                <br />
                Bhopal, Madhya Pradesh
              </span>
            </div>
          </div> */}
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Contact;
