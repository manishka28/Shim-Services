import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Electrical = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/booking');
  };

  // Updated service items with electrical services
  const services = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/1571179874/photo/technician-installing-wooden-ceiling-fan-in-kitchen.jpg?s=612x612&w=0&k=20&c=0d3HDdcRkW36Edph0bsdumAJgmTL8w9RgSqPcmXRFa8=',
      title: 'Ceiling Fan Installation',
      description: [
        'Professional ceiling fan installation',
        'Safe and efficient setup'
      ],
      price: 650
    },
    {
      id: 2,
      imgSrc: 'https://media.istockphoto.com/id/511990814/photo/industrial-electric-panel-repair.jpg?s=612x612&w=0&k=20&c=ZMQMHaywhO3UBZ0NA-bYWqlvGx2QJPCTXFlMK6Kch9I=',
      title: 'Electrical Safety Check Inspection',
      description: [
        'Thorough electrical inspection for safety',
        'Identify and resolve potential hazards'
      ],
      price: 800
    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1182746642/photo/wiring-in-domestic-consumer-unit-circuit-breaker.jpg?s=612x612&w=0&k=20&c=dhYIVZZ19nxn7fYU8KMzESAC8TMsEwLcYqYICoHepvg=',
      title: 'Fuse Box Replacement',
      description: [
        'Replace outdated fuse boxes',
        'Ensure reliable power management'
      ],
      price: 750
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/467725242/photo/service-worker-at-industrial-compressor-station.jpg?s=612x612&w=0&k=20&c=pGm7U4bo5kciXiOe4Yzd1pI4UtaEHfKVX_DT0wgtQl0=',
      title: 'Generator Installation',
      description: [
        'Installation of backup generators',
        'Keep your home powered during outages'
      ],
      price: 110
    },
    {
      id: 5,
      imgSrc: 'https://media.istockphoto.com/id/157315164/photo/electrician-installing-kitchen-light.jpg?s=612x612&w=0&k=20&c=2_TzT4ICP579Vh5SY8OnWypHSHZQ4dtI8pJrOA5cwv8=',
      title: 'Light Fixture Installation',
      description: [
        'Install new light fixtures safely',
        'Enhance home lighting'
      ],
      price: 699
    },
    {
      id: 6,
      imgSrc: 'https://media.istockphoto.com/id/1297486927/photo/lamp-on-white-background.jpg?s=612x612&w=0&k=20&c=A_hHSeI3nel0toXrDsFKnxu2309Rhfqnf5X6lQ77qZA=',
      title: 'Outlet Replacement',
      description: [
        'Replace old or faulty outlets',
        'Ensure electrical safety and efficiency'
      ],
      price: 550
    },
    {
      id: 7,
      imgSrc: 'https://media.istockphoto.com/id/1075182646/photo/electric-house-rewire.jpg?s=612x612&w=0&k=20&c=R2Krd5A_Kr3VoDbvoJeFAxVAhuCRDXXPqJ9rOiqiOg0=',
      title: 'Wiring Installation',
      description: [
        'New wiring for homes and renovations',
        'Compliant with electrical standards'
      ],
      price: 699
    }
  ];

  const cardItems = [
    { id: 1, imageSrc: 'https://media.istockphoto.com/id/1468264064/photo/electrician-repairs-the-ceiling-fan.jpg?s=612x612&w=0&k=20&c=FIFdcZGAu8M3tQl3tvFEnB8hstu3WcA52n596em3D4k=', title: 'Ceiling Fan Installation' },
    { id: 2, imageSrc: 'https://media.istockphoto.com/id/96395479/photo/female-electrician.jpg?s=612x612&w=0&k=20&c=M8GJ16WmrmdQWUgRIreVDT5pocRIX9sBp5x4s2HBrsY=', title: 'Electrical Safety Check Inspection' },
    { id: 3, imageSrc: 'https://media.istockphoto.com/id/670470744/photo/electrician-fixing-electrical-devices-with-different-tools.jpg?s=612x612&w=0&k=20&c=LV-ehsulDsbVw4kaWCNqmkcE5VAixt6jX-7bkmb0BZY=', title: 'Fuse Box Replacement' },
    { id: 4, imageSrc: 'https://media.istockphoto.com/id/2154739839/photo/mature-engineer-repairing-a-solar-energy-generator.jpg?s=612x612&w=0&k=20&c=-j0fy8tQEVaBmSnDWIyZdrC_4uDtDDYyrK1hF__ok-M=', title: 'Generator Installation' },
    { id: 5, imageSrc: 'https://media.istockphoto.com/id/184968332/photo/installing-led-retrofit-bulb-into-ceiling-fixture.jpg?s=612x612&w=0&k=20&c=ARgPkxIT8Sots3kgkm0E2SSYyGgzp4FcKyADp0C-1Y4=', title: 'Light Fixture Installation' },
    { id: 6, imageSrc: 'https://media.istockphoto.com/id/1226362179/photo/man-is-installing-the-socket-electricity-maintenance-repair-works-in-the-flat-restoration.jpg?s=612x612&w=0&k=20&c=BaLuLEWNebhYbyGovDmdCy38hwrw1MASKV2F3IBAGrs=', title: 'Outlet Replacement' }
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
            <h2 className="text-5xl font-extrabold text-center mb-4">Electrical Repair Services</h2>
            <p className="mt-2">Get professional electrical repair and installation services. ShimServices is here to ensure your electrical systems are safe and functional.</p>
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
              <video className="w-full h-[400px] object-cover" src="https://videos.pexels.com/video-files/5090785/5090785-sd_960_506_25fps.mp4" autoPlay muted loop playsInline></video>
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Expert Electrical Solutions</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="w-full h-[400px] object-cover" src="https://media.istockphoto.com/id/1268557129/photo/electricians-wiring-a-new-build.jpg?s=612x612&w=0&k=20&c=HPRkWv5g41fU6XYncBOhPopANJEb-wmAR94IUnAl_Vg=" alt="carousel item" />
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Reliable Repairs Done Right</h2>
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
  ShimServices provides reliable electrical repair services for homes and businesses:
</p>
<ul className="list-none space-y-3 text-gray-700 mt-4">
  <li className="flex items-center">
    <i className="fas fa-fan text-blue-600 mr-2"></i>
    <span className="font-medium text-lg">Ceiling Fan Installation</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-shield-alt text-green-600 mr-2"></i>
    <span className="font-medium text-lg">Electrical Safety Check</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-plug text-yellow-600 mr-2"></i>
    <span className="font-medium text-lg">Fuse Box Replacement</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-cogs text-orange-600 mr-2"></i>
    <span className="font-medium text-lg">Generator Installation</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-lightbulb text-purple-600 mr-2"></i>
    <span className="font-medium text-lg">Light Fixture Installation</span>
  </li>
</ul>

          <Reviews serviceName={"Electrical Repair"}/>
        </div>
        <div className="flex flex-col mx-4 md:w-1/2">
        <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
        <div className="flex-6">
          <Details services={services} service_name={"Electrical Repair"} />
        </div>
        </div>
      </div>
    </>
  );
};

export default Electrical;
