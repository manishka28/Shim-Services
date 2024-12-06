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

const Plumbing = () => {

  
  const handleBookNow = () => {
    
      
      navigate('/booking');
  
  };
  const services = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/1349484255/photo/technician-installing-reverse-osmosis-equipment-under-the-sink-detail.jpg?s=612x612&w=0&k=20&c=mVFS441t8M1CkwwlzapM88TXZDtzy8hkcvJmQtu3Jas=',
      title: 'Faucet Repair',
      description: [
        'Repair and replacement of leaking or damaged faucets',
        'Installation of new faucet systems and upgrades'
      ],
      price:499
    },
    {
      id: 2,
      imgSrc: 'https://media.istockphoto.com/id/1884881753/photo/home-inspector-use-thermal-imager.jpg?s=612x612&w=0&k=20&c=JvFI2aM5a0GUydpVRhN0l2MfjvZuHkK0nvdfEEJREvk=',
      title: 'Leak Detection',
      description: [
        'Detection and repair of hidden water leaks in pipes',
        'Use of advanced tools to pinpoint and fix leaks efficiently'
      ],
      price:399
    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1188290219/photo/heating-exchange-inspection.jpg?s=612x612&w=0&k=20&c=1uGZCkqxNMY6F4ZXl6hVZP4QZv-2PZHJRwO2O4XIq0U=',
      title: 'Pipe Repair',
      description: [
        'Fixing broken or corroded pipes to prevent water damage',
        'Repipe and replacement of worn-out piping systems'
      ],
      price:999
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/1678101515/photo/worker-holding-pipe-and-pumping-out-household-septic-tank-drain-and-sewage-cleaning-service.jpg?s=612x612&w=0&k=20&c=fyqMsehdppHYfsklaPBZUORpgBctvPAV2zrWut0nnFE=',
      title: 'Septic Tank Cleaning',
      description: [
        'Cleaning and maintenance of septic tanks to prevent blockages',
        'Inspection and pumping of tanks to ensure proper function'
      ],
      price:5999
    },
    {
      id: 5,
      imgSrc: 'https://media.istockphoto.com/id/1034326938/photo/man-using-wrench-repairing-toilet-cistern.jpg?s=612x612&w=0&k=20&c=vUt344xS57b77BDOtBs73vK3Vu7kfmFH14gELjpJ10k=',
      title: 'Toilet Repair',
      description: [
        'Fixing clogged or malfunctioning toilets',
        'Installation and replacement of toilet systems'
      ],
      price:999
    },
    {
      id: 6,
      imgSrc: 'https://media.istockphoto.com/id/837182788/photo/natural-gas-combi-service.jpg?s=612x612&w=0&k=20&c=5JiTMGfxUkJSkvbh0bAd7tKycP2m-P65hdd198aEDzw=',
      title: 'Water Heater Installation',
      description: [
        'Installation and repair of water heating systems',
        'Inspection and maintenance of water heaters for optimal performance'
      ],
      price:699
    }
];


const cardItems = [
  { id: 1, imageSrc: 'https://media.istockphoto.com/id/1205228815/photo/male-plumber-working-to-fix-leaking-sink-in-home-bathroom.jpg?s=612x612&w=0&k=20&c=VIX39T8xM5qNUTM6qqy8SDsGMs7OaaZotFNv3dCn2CU=', title: 'Faucet Repair' },
  { id: 2, imageSrc: 'https://media.istockphoto.com/id/1464818215/photo/black-female-plumber-at-work.jpg?s=612x612&w=0&k=20&c=Uyc34wV4r3FKo9p7A7FBDRVHqvC5u8lzgZ-E9CxwcOc=', title: 'Leak Detection' },
  { id: 3, imageSrc: 'https://media.istockphoto.com/id/911703434/photo/hands-of-plumber-with-a-wrench.jpg?s=612x612&w=0&k=20&c=vUroIJBzae0CbrcGe_ut2_CJSvBu4owfaYcP6ZC23DI=', title: 'Pipe Repair' },
  { id: 4, imageSrc: 'https://media.istockphoto.com/id/1392943694/photo/a-utility-worker-lifts-a-manhole-cover-for-sewerage-maintenance-and-pumping-out-feces-septic.jpg?s=612x612&w=0&k=20&c=UdtX98HAIpJZbdof5EBYoQMYc9wBvIKBHyszvqmxiOo=', title: 'Septic Tank Cleaning' },
  { id: 5, imageSrc: 'https://media.istockphoto.com/id/944254400/photo/plumber-at-work-in-a-bathroom-plumbing-repair-service-assemble-and-install-concept.jpg?s=612x612&w=0&k=20&c=wXq2DF86yFwNTw18ZF1IbclKwksgcCe_RLft98RItRU=', title: 'Toilet Repair' },
  { id: 6, imageSrc: 'https://media.istockphoto.com/id/1391879565/photo/closeup-of-plumber-using-screwdriver-while-fixing-boiler-or-water-heater-working-on-heating.jpg?s=612x612&w=0&k=20&c=YhSh21AjRZsuiO298i69C36AMFryjIlIcd8YHUou7PI=', title: 'Water Heater Installation' },
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
            <h2 className="text-5xl font-extrabold text-center mb-4">Plumbing</h2>
            <p className="mt-2">Don't let Plumbing issues slow you down. ShimServices is here to help. When Plumbing break, ShimServices fixes them fast.</p>
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
              <video className="w-full h-[400px] object-cover" src="https://media.istockphoto.com/id/925189766/video/sanitary-engineering-repair-of-water-leakage-man-fixing-a-faucet-in-the-kitchen.mp4?s=mp4-480x480-is&k=20&c=YnTzBZoDe1cEZ6qi04vP5zidiJEceKWDt0WukVQeZe0=" autoPlay muted loop playsInline></video>
              <Carousel.Caption>
              <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
      <h2 className="text-2xl font-bold text-white">
        Where Plumbing meet Expertise!
      </h2>
    </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="w-full h-[400px] object-cover" src="https://media.istockphoto.com/id/155432914/photo/latin-plumber-repairman-working-under-sink-home-kitchen-service-industry.jpg?s=612x612&w=0&k=20&c=MgB1Qq95Z120hiIdHcyQoaXhYcfQDVKn_SL4BfLauAA=" alt="carousel item" />
              <Carousel.Caption>

               <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
      <h2 className="text-2xl font-bold text-white">
      "Plumbing Rescue, Done Right"
      </h2>
        </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="w-full h-[400px] object-cover" src="https://media.istockphoto.com/id/1129117534/photo/wrench-always-with-you-worker-set-up-electric-heating-boiler-at-home-bathroom.jpg?s=612x612&w=0&k=20&c=TNCvretiRzjbBJOO9sO1VVMEQpQ3fTQToEetzCCQyO0=" alt="carousel item" />
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
        <div className=" flex flex-col text-xl md:w-1/2">
          <hr />
          
          <h2 className='font-bold text-center mt-4 text-3xl text-gray-800'>What We Offer</h2>
<p className="text-center text-lg text-gray-600 mb-4">
  ShimServices provides reliable Plumbing services.
</p>
<ul className="list-none space-y-3 text-gray-700 mt-4">
  <li className="flex items-center">
    <i className="fas fa-tint text-blue-600 mr-2"></i>
    <span className="font-medium text-lg">Faucet Repair</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-droplet text-green-600 mr-2"></i>
    <span className="font-medium text-lg">Leak Detection</span>
  </li>

  <li className="flex items-center">
    <i className="fas fa-fire text-yellow-500 mr-2"></i>
    <span className="font-medium text-lg">Water Heater Installation</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-toilet text-gray-600 mr-2"></i>
    <span className="font-medium text-lg">Toilet Repair</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-snowflake text-blue-400 mr-2"></i>
    <span className="font-medium text-lg">Geyser Repair</span>
  </li>
</ul>

 
          <Reviews serviceName={"Plumbing"} />
        </div>
        <div className="flex flex-col mx-4 md:w-1/2">
        <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
        <div className="flex">
        
          <Details services={services} service_name={"Plumbing Services"} />
        </div>
        </div>
      </div>
      
    </>
  );
};

export default Plumbing;
