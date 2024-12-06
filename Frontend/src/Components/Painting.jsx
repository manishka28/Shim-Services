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

const Painting = () => {

  
  const handleBookNow = () => {
    
      
      navigate('/booking');
  
  };
  const services = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/1499867323/photo/air-conditioning-cleaning-service-with-water-spray.jpg?s=612x612&w=0&k=20&c=MAvE5vQvvRKhQGXrb9uL_7wsXWdlqzWt9wl25uCAffg= ',
      title: 'Cabinet Refinishing',
      description: [
        'Thorough servicing of appliance compressors',
        'Filter replacement and comprehensive cleaning'
      ],
       price: 499
    },
    {
      id: 2,
      imgSrc: 'https://media.istockphoto.com/id/149422501/photo/construction-worker-painting-building-facade-with-green-tone.jpg?s=612x612&w=0&k=20&c=AOWLIteg-9ZyYyAbmPN-mFaPm0uM1tRlirUXTktos9k=',
      title: 'Exterior Painting',
      description: [
        'Advanced filter replacement technology',
        'Deep cleaning of air filters'
      ],
     price: 899
    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1015387276/photo/man-in-a-working-overall.jpg?s=612x612&w=0&k=20&c=SiHLfl9X0lkncWAqyi8llAAG_dg4vk6mFn8JzaatQfk= ',
      title: 'Interior Painting',
      description: [
        'Complete gas refill for refrigerators',
        'Includes inspection and repair of leaks'
      ],
       price: 299
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/1147583952/photo/working-man-rolling-glue-for-a-wallpaper.jpg?s=612x612&w=0&k=20&c=4z-ZtzohydTg4E8KU4zwILkav0ZT2cdTWsYe9Ky-Nxo=',
      title: 'Wallpaper Installation',
      description: [
        'Expert installation of new appliances',
        'Full diagnostic and testing post-installation'
      ],
       price: 299
    }
   
    
     
    
  ];

  const cardItems = [
    { id: 1, imageSrc: 'https://media.istockphoto.com/id/1167738570/photo/painter-man-at-work-with-a-paint-roller.jpg?s=612x612&w=0&k=20&c=0kxW3BuLj75rEkT6jhJqXYtQUlP97PBMUExViwuLs18=', title: 'Interior Painting' },
    { id: 2, imageSrc: 'https://media.istockphoto.com/id/144285650/photo/the-house-painter.jpg?s=612x612&w=0&k=20&c=X5NGP-_FWluUHaJEyNUfOePoOnVXDb_mPSl98L4uBow=', title: 'Exterior Painting' },
    
    { id: 3, imageSrc: 'https://media.istockphoto.com/id/1396955693/photo/worker-hands-sticking-wallpaper-on-wall-home-decoration-by-yourself-copy-space.jpg?s=612x612&w=0&k=20&c=wBzJbDy28Zq9Nq5A_Fhow7-Y093PyKNJozISXoXinQk= ', title: 'Wallpaper Installation' },
    { id: 4, imageSrc: 'https://media.istockphoto.com/id/1470710713/photo/close-up-of-mature-man-painting-and-restoring-an-old-antique-wooden-cabinet-at-home-with.jpg?s=612x612&w=0&k=20&c=wKHE9yUmVeUp85NsOuVE4VqyUNFhdkUWw7-K6IowVZk= ', title: 'Cabinet Refinishing' },
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
            <h2 className="text-5xl font-extrabold text-center mb-4">Painting</h2>
            <p className="mt-2">Don’t let worn-out walls hold you back. ShimServices is here to refresh your space. When your walls need a new look, ShimServices paints them with precision and speed.</p>
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
              <video className="w-full h-[400px] object-cover" src="https://media.istockphoto.com/id/1723010773/video/handyman-painting-walls-at-his-home.mp4?s=mp4-640x640-is&k=20&c=wEo6K-25ZVgjOkTw2Ynw9X-gL_MYw1Ioxcb7Xf6Etg0=" autoPlay muted loop playsInline></video>
              <Carousel.Caption>
              <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
      <h2 className="text-2xl font-bold text-white">
        Where Painting meet Expertise!
      </h2>
    </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="w-full h-[400px] object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP56gJ3vpVlxiqO411EK24i0ucg5U7II8wMgfmxAamZIwBXZcTp_CgeCgN7Pl9bR85gxY&usqp=CAU" alt="carousel item" />
              <Carousel.Caption>

               <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
      <h2 className="text-2xl font-bold text-white">
        Painting, Done Right</h2>
        </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="w-full h-[400px] object-cover" src="https://media.istockphoto.com/id/468842398/photo/painting-walls-of-an-empty-room.jpg?s=612x612&w=0&k=20&c=K9H6RinxINrynw-CWjqA1Q73NNypx-SauSN1ePepb4M=" alt="carousel item" />
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
<p className="text-lg text-center text-gray-600 mb-4">
  ShimServices provides professional Painting services for homes and offices.
</p>
<ul className="list-none space-y-3 text-gray-700 mt-4">
  <li className="flex items-center">
    <i className="fas fa-paint-roller text-blue-600 mr-2"></i>
    <span className="font-medium text-lg">Interior Painting</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-paint-brush text-red-600 mr-2"></i>
    <span className="font-medium text-lg">Exterior Painting</span>
  </li>
  
  <li className="flex items-center">
    <i className="fas fa-scroll text-green-600 mr-2"></i>
    <span className="font-medium text-lg">Wallpaper Installation</span>
  </li>
</ul>

          <Reviews serviceName={"Painting Services"} />
        </div>
        <div className="flex flex-col mx-4 md:w-1/2">
        <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
        <div className="flex-6">
          <Details services={services} service_name={"Painting Services"} />
        </div>
        </div>
      </div>
      
    </>
  );
};

export default Painting;
