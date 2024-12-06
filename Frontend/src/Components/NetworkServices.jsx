import React, { useRef, useEffect } from 'react';

import Details from './Details';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Reviews } from './Reviews';


const Card = ({ imageSrc, title }) => (
  <div className="m-4 p-1 text-center w-30 h-32 text-gray-900 transition-shadow duration-300 overflow-visible hover:shadow-lg">
    <img src={imageSrc} alt="card" className="w-full h-full object-cover" />
    <p className="mt-1">{title}</p>
  </div>
);

const NetworkServices = () => {

  
  const handleBookNow = () => {
    
      
      navigate('/booking');
  
  };
  const services = [
    {
      id: 1,
      imgSrc: 'https://cdn.pixabay.com/photo/2022/09/27/15/52/network-cabling-installation-7483084_1280.jpg',
      title: 'Network Installation',
      description: [
        'Setting up network infrastructure and devices',
        'Configuration of routers, switches, and access points'
      ],
      price: 699
    },
    {
      id: 2,
      imgSrc: 'https://cdn.pixabay.com/photo/2018/05/14/16/25/cyber-security-3400657_1280.jpg',
      title: 'Network Security Audit',
      description: [
        'Comprehensive security review of network infrastructure',
        'Identification and mitigation of vulnerabilities'
      ],
      price: 120
    },
    {
      id: 3,
      imgSrc: 'https://cdn.pixabay.com/photo/2024/07/24/16/15/engineering-8918766_1280.jpg',
      title: 'Network Troubleshooting',
      description: [
        'Identifying and resolving network issues',
        'Optimizing network performance and connectivity'
      ],
      price: 799
    },
    {
      id: 4,
      imgSrc: 'https://cdn.pixabay.com/photo/2018/10/02/21/39/smart-3720021_1280.jpg',
      title: 'Wireless Network Setup',
      description: [
        'Setting up secure and stable wireless networks',
        'Configuration of wireless access points and routers'
      ],
      price: 299
    }
  ];
  
  const cardItems = [
    { id: 1, imageSrc: 'https://cdn.pixabay.com/photo/2024/06/22/18/09/ai-generated-8846759_1280.jpg', title: 'Network Installation' },
    { id: 2, imageSrc: 'https://cdn.pixabay.com/photo/2020/08/09/14/25/business-5475656_1280.jpg', title: 'Network Security Audit' },
    { id: 3, imageSrc: 'https://cdn.pixabay.com/photo/2018/09/06/22/11/electrician-3659459_1280.jpg', title: 'Network Troubleshooting' },
    { id: 4, imageSrc: 'https://cdn.pixabay.com/photo/2021/11/11/23/17/connection-6787481_1280.png', title: 'Wireless Network Setup' }
  ];
  

  const leftSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const stickyOffset = leftSectionRef.current.offsetTop;
      if (window.scrollY > stickyOffset) {
        leftSectionRef.current.classList.add("sticky");
      } else {
        leftSectionRef.current.classList.remove("sticky");
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-2.5 md:flex-row">
  {/* Left Section */}
  <div className="md:w-1/2 text-black flex flex-wrap p-2.5 sticky top-0 max-h-[calc(100vh-40px)] overflow-y-auto" ref={leftSectionRef}>
    <div className="mb-2.5 mt-2.5 pl-4">
      <h2 className="text-5xl font-extrabold text-center mb-4">Network Services</h2>
      <p className="mt-2">Don't let network issues slow you down. ShimServices is here to provide professional network solutions for home and office setups. Whether you need installation, troubleshooting, or security audits, we’ve got you covered.</p>
      <div className="flex items-center underline">
        <img src="https://t3.ftcdn.net/jpg/04/20/03/48/360_F_420034841_AKpgqQGkkUyeD7oWc9y8vGTMwT4GmbHm.jpg" className="h-5 w-20 mt-2" alt="rating" />
        <p className="ml-2">6M+ bookings till now</p>
      </div>
      {/* <button onClick={handleBookNow} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Book Now</button> */}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cardItems.map(item => (
        <Card key={item.id} imageSrc={item.imageSrc} title={item.title} />
      ))}
    </div>
  </div>

  {/* Right Section */}
  <div className="mx-4 md:w-1/2 mt-24 pl-5 box-border z-[-1]">
    <Carousel fade>
      <Carousel.Item>
        <video className="w-full h-[400px] object-cover" src="https://videos.pexels.com/video-files/7140937/7140937-sd_640_360_24fps.mp4" autoPlay muted loop playsInline></video>
        <Carousel.Caption>
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
            <h2 className="text-2xl font-bold text-white">
              Where Network Expertise Meets Your Needs
            </h2>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="w-full h-[400px] object-cover" src="https://cdn.pixabay.com/photo/2016/04/04/14/12/monitor-1307227_1280.jpg" alt="carousel item" />
        <Carousel.Caption>
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
            <h2 className="text-2xl font-bold text-white">
              Network Security, Done Right
            </h2>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="w-full h-[400px] object-cover" src="https://cdn.pixabay.com/photo/2017/07/31/16/18/engineer-2558705_1280.jpg" alt="carousel item" />
        <Carousel.Caption>
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
            <h2 className="text-2xl font-bold text-white">
              Get Your Network Up and Running Fast
            </h2>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
</div>

{/* Additional Section */}
<div className="flex flex-col-reverse  md:flex-row p-2.5 m-6">
  <div className="flex flex-col text-xl md:w-1/2">
    <hr />
    <h2 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-2">What We Offer</h2>
    <p className="text-lg text-center text-gray-600 mb-4">
    ShimServices provides reliable network services for home and office setups</p>
    <ul className="list-disc list-inside mt-4 space-y-2">
      <li className="flex items-center">
        <i className="fas fa-plug text-blue-500 mr-2"></i>
        Network Installation
      </li>
      <li className="flex items-center">
        <i className="fas fa-shield-alt text-green-500 mr-2"></i>
        Network Security Audits
      </li>
      <li className="flex items-center">
        <i className="fas fa-cogs text-orange-500 mr-2"></i>
        Network Troubleshooting
      </li>
      <li className="flex items-center">
        <i className="fas fa-wifi text-purple-500 mr-2"></i>
       Wireless Network Setup
      </li>
    </ul>
    <Reviews serviceName={"Network Services"} />
  </div>
  <div className="flex flex-col mx-4 md:w-1/2">
        <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
  <div className="flex-6">
    <Details services={services} service_name={"Network Services"} />
  </div>
  </div>
</div>


      
    </>
  );
};

export default NetworkServices;
