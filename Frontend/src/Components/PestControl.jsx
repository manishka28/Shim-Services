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

const PestControl = () => {

  
  const handleBookNow = () => {
    
      
      navigate('/booking');
  
  };
  const services = [
    {
      id: 1,
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwR1xl1oz2J0kf4RHt6nY7KcuYtjFk7zPdrA&s',
      title: 'Ant Control',
      description: [
        'Effective treatment to eliminate ant infestations',
        'Long-lasting protection to keep ants away'
      ],
      price:499
    },
    {
      id: 2,
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgqfrG3YBcWPuiZrZZLjmqfU5NEzn9VrzWgQ&s',
      title: 'Bed Bug Extermination',
      description: [
        'Thorough extermination of bed bugs',
        'Safe and efficient methods to protect your home'
      ],
      price:799
    },
    {
      id: 3,
      imgSrc: 'https://images.pexels.com/photos/14675105/pexels-photo-14675105.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Insect Control',
      description: [
        'Comprehensive insect control for all types',
        'Prevents future infestations'
      ],
      price:899
    },
    {
      id: 4,
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpVk_-pgjJn5f3vxbMekltXh7Qf3NadOXJkA&s',
      title: 'Mosquito Treatment',
      description: [
        'Targeted mosquito treatment',
        'Reduces mosquito populations around your home'
      ],
      price:699
    },
    {
      id: 5,
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgDXYlF4Ouc5JsQf0-F7tOiZ0__i5_u_ttzQ&s',
      title: 'Rodent Control',
      description: [
        'Effective rodent removal solutions',
        'Safe methods to protect your property'
      ],
      price:1799
    },
    {
      id: 6,
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTKJBubCdYlyr_E8R-mEHwVk-2gRD5pURR8w&s',
      title: 'Termite Treatment',
      description: [
        'Professional termite treatment services',
        'Prevents and protects against termite damage'
      ],
      price:2399
    }
  ];
  

  const cardItems = [
    { id: 1, imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRncC8RPCHWN5C9z7tc3JoX7H9BFTznQR6btg&s', title: 'Ant Control' },
    { id: 2, imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7HTgZu4wf1UmWMVEN9m2LLSPi9V8ADdssIw&s', title: 'Bed Bug Extermination' },
    { id: 3, imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGo634-42fMEhNb2plLGTYPEHgGjQFOVZ1w&s', title: 'Insect Control' },
    { id: 4, imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEGu-HrQGpGkC27xbGVaBOIB3Q7_dSH2_oig&s', title: 'Mosquito Treatment' },
    { id: 5, imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRedf6Fjg68L_O4iElib5OKwGbn7vI86aO8Jg&s', title: 'Rodent Control' },
    { id: 6, imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVKp-x7nOW4Fxu64bG8rKAhzkr9t7aAyAz9A&s', title: 'Termite Treatment' },
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
            <h2 className="text-5xl font-extrabold text-center mb-4">Pest Control</h2>
            <p className="mt-2">Don't let pests invade your peace. ShimServices is here to help. When pests strike, ShimServices eliminates them fast.</p>
            <div className="flex items-center underline">
              <img src="https://t3.ftcdn.net/jpg/04/20/03/48/360_F_420034841_AKpgqQGkkUyeD7oWc9y8vGTMwT4GmbHm.jpg" className="h-5 w-20 mt-2" alt="rating" />
              <p className="ml-2">6M+ bookings till now</p>
            </div>
            {/* <button onClick={handleBookNow} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Book Now</button> */}
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {cardItems.map(item => (
              <Card key={item.id} imageSrc={item.imageSrc} title={item.title} />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="mx-4 md:w-1/2 mt-24 pl-5 box-border z-[-1]">
          <Carousel fade>
            <Carousel.Item>
              <video className="w-full h-[400px] object-cover" src="https://videos.pexels.com/video-files/4145338/4145338-uhd_2560_1440_25fps.mp4" autoPlay muted loop playsInline></video>
              <Carousel.Caption>
              <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
      <h2 className="text-2xl font-bold text-white">
      Your Shield Against Unwanted Guests!
      </h2>
    </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="w-full h-[400px] object-cover" src="https://images.pexels.com/photos/4176036/pexels-photo-4176036.jpeg?auto=compress&cs=tinysrgb&w=600" alt="carousel item" />
              <Carousel.Caption>

               <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
      <h2 className="text-2xl font-bold text-white">
      Pest Removal, Done Right.</h2>
        </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="w-full h-[400px] object-cover" src="https://media.istockphoto.com/id/1347516184/photo/repairman-handshake-in-house-door.jpg?s=612x612&w=0&k=20&c=ePJmBK67AQ1O__VvHkMFKp7UE4rwHbSNhUTNqQ9M2j0=" alt="carousel item" />
              <Carousel.Caption>
              <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
              <h2 className="text-2xl font-bold text-white">All things done Right. At your pace, At your comfort.</h2>
              </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Additional Section */}
      <div className="flex flex-col-reverse md:flex-row p-2.5 m-6">
        <div className="flex flex-col text-xl md:w-1/2">
          <hr />
          <h2 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-2">What We Offer</h2>
          <p className="text-lg text-center text-gray-600 mb-4">ShimServices provides reliable pest control services:</p>
          <ul className="list-none mt-4 space-y-2">
  <li className="flex items-center">
    <i class="fas fa-bug mr-2 text-red-500"></i> Ant Control
  </li>
  <li className="flex items-center">
    <i class="fas fa-bed mr-2 text-purple-500"></i> Bed Bug Extermination
  </li>
  <li className="flex items-center">
    <i class="fas fa-spider mr-2 text-green-500"></i> Insect Control
  </li>
  <li className="flex items-center">
    <i class="fas fa-mosquito mr-2 text-blue-500"></i> Mosquito Treatment
  </li>
  <li className="flex items-center">
    <i class="fas fa-mouse mr-2 text-gray-600"></i> Rodent Control
  </li>
  <li className="flex items-center">
    <i class="fas fa-house-damage mr-2 text-yellow-500"></i> Termite Treatment
  </li>
</ul>


          <Reviews serviceName={"Pest Control"} />
        </div>
        <div className="flex flex-col mx-4 md:w-1/2">
        <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
        <div className="flex-6">
          <Details services={services} service_name={"Pest Control"} />
        </div>
        </div>
      </div>
      
    </>
  );
};

export default PestControl;
