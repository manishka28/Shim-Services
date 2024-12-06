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

const Carpentry = () => {

  
  const handleBookNow = () => {
    
      
      navigate('/booking');
  
  };
  const services = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/1061173208/photo/young-carpenter-using-sander-while-working-on-a-piece-of-wood.jpg?s=612x612&w=0&k=20&c=dG_8gk4Zkfq2hsXcxZSHzc1e39QpQODb5AXvx1dWRAw=',
      title: 'Cabinet Installation',
      description: [
        'Expert installation of custom cabinetry',
        'Precision alignment and secure mounting',
        'Includes cleanup and minor adjustments'
      ],
      price:14999
    },
    {
      id: 2,
      imgSrc: 'https://media.istockphoto.com/id/1340045586/photo/the-installation-wizard-kitchen-storage-systems-sets-the-correct-level-of-the-upper-cabinet.jpg?s=612x612&w=0&k=20&c=tSYuxfehtUsrvyuCgjyyQL9xfdeycHiYfgas6HDID2E=',
      title: 'Custom Furniture Building',
      description: [
        'Personalized furniture design and construction',
        'Crafted to fit unique spaces and styles',
        'High-quality materials for durability'
      ],
      price:1299

    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1173697153/photo/fitting-a-kitchen.jpg?s=612x612&w=0&k=20&c=vN8eOsxSPLJt6u89XW1x4xKRswv8rRgTt83WDvowOcc=',
      title: 'Deck Construction',
      description: [
        'Construction of sturdy, weather-resistant decks',
        'Customizable sizes and designs',
        'Includes staining and finishing'
      ],
      price:899
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/1425248860/photo/carpenter-working-on-his-project.jpg?s=612x612&w=0&k=20&c=WIh90x2gMxv-OVTzXfSZJarmU9hbYQEvaZjYOAoHDIg=',
      title: 'Door Repair',
      description: [
        'Repair of damaged or misaligned doors',
        'Replacement of hinges, knobs, and locks',
        'Ensures smooth operation and secure closure'
      ],
      price:799
    },
    {
      id: 5,
      imgSrc: 'https://media.istockphoto.com/id/1135016158/photo/man-repairing-the-doorknob-closeup-of-workers-hands-installing-new-door-locker.jpg?s=612x612&w=0&k=20&c=JSwzPZhPJnh3kqRjUpZKnurzC7saO8n61sAsEEE42-k=',
      title: 'Flooring Installation',
      description: [
        'Professional installation of hardwood, laminate, and tile',
        'Attention to detail for a seamless finish',
        'Preparation and cleanup included'
      ],
      price:1299
    },
    {
      id: 6,
      imgSrc: 'https://media.istockphoto.com/id/1061173208/photo/young-carpenter-using-sander-while-working-on-a-piece-of-wood.jpg?s=612x612&w=0&k=20&c=dG_8gk4Zkfq2hsXcxZSHzc1e39QpQODb5AXvx1dWRAw=',
      title: 'Furniture Repair',
      description: [
        'Restoration of broken or damaged furniture',
        'Expert repairs for durability and appearance',
        'Sanding, refinishing, and reupholstering options'
      ],
      price:899
    },
    {
      id: 7,
      imgSrc: 'https://media.istockphoto.com/id/155157558/photo/a-tradesman-installing-hanging-shelves.jpg?s=612x612&w=0&k=20&c=9GV8u0QcOAzKhR_IijuAT4_t8_a6fVysSvBKn_TDv_E=',
      title: 'Shelving Installation',
      description: [
        'Custom shelving solutions for homes and offices',
        'Secure and level installation',
        'Tailored to match your space and decor'
      ],
      price:7999
    },
    {
      id: 8,
      imgSrc: 'https://media.istockphoto.com/id/1307554865/photo/electrician-working-at-construction-site.jpg?s=612x612&w=0&k=20&c=ccutnrLXshnSnHiOaNCg_uQdy_W3Akaiq972XsAelOo=',
      title: 'Trim Installation',
      description: [
        'Installation of baseboards, crown molding, and trim',
        'Precision cutting and fitting for a polished look',
        'Enhances the aesthetic of any room'
      ],
      price:999
    }
  ];
  

  const cardItems = [
    { id: 1, imageSrc: 'https://images.pexels.com/photos/5089180/pexels-photo-5089180.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Shelving Installation' },
    { id: 2, imageSrc: 'https://media.istockphoto.com/id/2167884011/photo/carpentry-expertise-in-action.jpg?s=612x612&w=0&k=20&c=vEt3eADZk9k91Ys80UB_DgIEjF5LT6kxi5DR7G6bORw=', title: 'Cabinet Installation' },
    { id: 3, imageSrc: 'https://media.istockphoto.com/id/1077179862/photo/man-assembly-wooden-furniture-fixing-or-repairing-house-with-tape-measures.jpg?s=612x612&w=0&k=20&c=D6LwK3NGW4_zxrozdLZ8a65gDJl-Jh3H9cactMFSlqE=', title: 'Custom Furniture Building' },
    { id: 4, imageSrc: 'https://media.istockphoto.com/id/962184006/photo/construction-worker-screwing-down-wood-deck-with-battery-power-screw-gun-or-drill.jpg?s=612x612&w=0&k=20&c=5J7IsAM32q9e7VJu3S4OtCmR331XS36R0MfRqj5V0h8=', title: 'Door Repair' },
    { id: 5, imageSrc: 'https://media.istockphoto.com/id/2158693978/photo/dismantle-a-retro-kitchen-with-sink.jpg?s=612x612&w=0&k=20&c=2j26LcRyA_l5ad0I4qjdsKZxqLavGxBnQ-R8jkCXX2w=', title: 'Deck Construction' },
    { id: 6, imageSrc: 'https://media.istockphoto.com/id/1135016158/photo/man-repairing-the-doorknob-closeup-of-workers-hands-installing-new-door-locker.jpg?s=612x612&w=0&k=20&c=JSwzPZhPJnh3kqRjUpZKnurzC7saO8n61sAsEEE42-k=', title: 'Floor Installation' },
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
        <div
          className="md:w-1/2 text-black flex flex-wrap p-2.5 sticky top-0 max-h-[calc(100vh-40px)] overflow-y-auto"
          ref={leftSectionRef}
        >
          <div className="mb-2.5 mt-2.5 pl-4">
            <h2 className="text-5xl font-extrabold text-center mb-4">Carpentry Services</h2>
            <p className="mt-2">Transform your space with expert carpentry. ShimServices brings precision and craftsmanship to every project, big or small.</p>
            <div className="flex items-center underline">
              <img src="https://t3.ftcdn.net/jpg/04/20/03/48/360_F_420034841_AKpgqQGkkUyeD7oWc9y8vGTMwT4GmbHm.jpg" className="h-5 w-20 mt-2" alt="rating" />
              <p className="ml-2">6M+ projects completed successfully</p>
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
              <video
                className="w-full h-[400px] object-cover"
                src="https://videos.pexels.com/video-files/6790697/6790697-sd_360_640_25fps.mp4"
                autoPlay
                muted
                loop
                playsInline
              ></video>
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Crafting Spaces, Crafting Dreams!</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-full h-[400px] object-cover"
                src="https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="carousel item"
              />
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Precision & Expertise in Every Project</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-full h-[400px] object-cover"
                src="https://images.pexels.com/photos/8447849/pexels-photo-8447849.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="carousel item"
              />
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Custom Carpentry, Just the Way You Like It</h2>
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
    <p className="text-lg text-center text-gray-600 mb-4">
      ShimServices provides skilled carpentry services to enhance every part of your home:
    </p>
    <ul className="list-none space-y-3 text-gray-700 mt-4">
      <li className="flex items-center">
        <i className="fas fa-couch text-green-600 mr-2"></i>
        <span className="font-medium text-lg">Furniture Assembly & Repair</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-tools text-blue-600 mr-2"></i>
        <span className="font-medium text-lg">Custom Cabinetry</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-door-closed text-yellow-600 mr-2"></i>
        <span className="font-medium text-lg">Door & Window Installation</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-warehouse text-purple-600 mr-2"></i>
        <span className="font-medium text-lg">Wooden Flooring Installation</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-shelf text-red-600 mr-2"></i>
        <span className="font-medium text-lg">Shelving & Storage Solutions</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-th-large text-pink-600 mr-2"></i>
        <span className="font-medium text-lg">Wall Paneling & Decor</span>
      </li>
    </ul>
   
    <div className="mt-4">
      <Reviews serviceName={"Carpentry"} />
    </div>
  </div>
  <div className="flex flex-col mx-4 md:w-1/2">
        <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
  <div className="flex-6">
    <Details services={services} service_name={"Carpentry"} />
  </div>
  </div>
</div>

      
    </>
  );
};

export default Carpentry;
