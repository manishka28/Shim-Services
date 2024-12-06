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

const Gardening = () => {

  
  const handleBookNow = () => {
    
      
      navigate('/booking');
  
  };
  const services = [ 
    {
      id: 1,
      title: 'Garden Design',
      imgSrc: 'https://media.istockphoto.com/id/1128257160/photo/spring-time-plants-shopping.jpg?s=612x612&w=0&k=20&c=dfvJtinn7RMmED0LrfAA5dDk7te42UoEOoQv2kgzpXM=', // Add the actual image URL
      description: [
        'Designing customized garden layouts',
        'Plant selection and placement'
      ],
      price: 599
    },
    {
      id: 2,
      title: 'Hedge Trimming',
      imgSrc: 'https://media.istockphoto.com/id/1163739474/photo/gardener-trimming-hedge-in-garden.jpg?s=612x612&w=0&k=20&c=t0goua0NOQxij9OsMS_OaKI_MF8KaclMfkOC_yMnC_k=', // Add the actual image URL
      description: [
        'Trimming and shaping hedges',
        'Maintaining healthy hedge growth'
      ],
      price: 299
    },
    {
      id: 3,
      title: 'Lawn Mowing',
      imgSrc: 'https://media.istockphoto.com/id/959860562/photo/garden-gasoline-scissors-trimming-green-bush-hedge-working-in-the-garden.jpg?s=612x612&w=0&k=20&c=yqGJofxk5tHHFtsgjsQuBH_tCyA4bYqXlDVZswKdx1A=', // Add the actual image URL
      description: [
        'Regular lawn mowing for neat appearance',
        'Grass trimming to desired height'
      ],
      price: 499
    },
    {
      id: 4,
      title: 'Tree Pruning',
      imgSrc: 'https://media.istockphoto.com/id/1325110967/photo/gardener-mows-the-lawn-with-an-mower.jpg?s=612x612&w=0&k=20&c=-JJ3LVKJzxRwngTyQuz6mIS2wsZzCydWMm_R-iqWr7U=', // Add the actual image URL
      description: [
        'Pruning trees for better growth and shape',
        'Removal of dead or damaged branches'
      ],
      price: 199
    },
    {
      id: 5,
      title: 'Weed Control',
      imgSrc: 'https://media.istockphoto.com/id/1174599934/photo/spraying-pesticide-with-portable-sprayer-to-eradicate-garden-weeds-in-the-lawn-weedicide.jpg?s=612x612&w=0&k=20&c=H0bhJOED0apvQVxrKohEnn6iDhLIiHD3RuW0ePjS2oY=', // Add the actual image URL
      description: [
        'Efficient removal of unwanted weeds',
        'Preventing future weed growth'
      ],
      price: 299
    }
  ];
  
  

  const cardItems = [
    { id: 1, imageSrc: 'https://media.istockphoto.com/id/1327489339/photo/professional-landscaping-team-working-in-garden.jpg?s=612x612&w=0&k=20&c=ptwevx-j7hBb8B0jYQnRCqUN9MbddJSFhroRdX7_7C0=', title: 'Garden Design' },
    { id: 2, imageSrc: 'https://media.istockphoto.com/id/542173948/photo/trimming-hedge-row.jpg?s=612x612&w=0&k=20&c=6fiB8d9kK30HrM97c677EL6OKonL9JSBMSAATw0_Kz0=', title: 'Hedge Trimming' },
    { id: 3, imageSrc: 'https://media.istockphoto.com/id/971465988/photo/landscaping-contractor-work.jpg?s=612x612&w=0&k=20&c=WvheFaZ5rf6AzN8_zsNeevPGOX9Ru4-PLtMKs9qPDzc=', title: 'Lawn Mowing' },
    { id: 4, imageSrc: 'https://media.istockphoto.com/id/134573874/photo/trimming-the-trees.jpg?s=612x612&w=0&k=20&c=CZwFbTftsIlNn6g8aWffwZ0g27XttDWPwZBRJG5zWYs=', title: 'Tree Pruning' },
    { id: 5, imageSrc: 'https://media.istockphoto.com/id/1240304529/photo/the-farmer-sprays-the-fruit-against-plant-parasites.jpg?s=612x612&w=0&k=20&c=tVxuAjoR-rhFBqDOP5LnycmBZGq0qJEgKbLAfl4PX_8=', title: 'Weed Control' },
    
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
      <h2 className="text-5xl font-extrabold text-center mb-4">Gardening Services</h2>
      <p className="mt-2">
        Take your garden to the next level with professional gardening services! From design to maintenance, we've got you covered for all your garden needs.
      </p>
      <div className="flex items-center underline">
        <img
          src="https://t3.ftcdn.net/jpg/04/20/03/48/360_F_420034841_AKpgqQGkkUyeD7oWc9y8vGTMwT4GmbHm.jpg"
          className="h-5 w-20 mt-2"
          alt="rating"
        />
        <p className="ml-2">6M+ bookings till now</p>
      </div>
      {/* <button onClick={handleBookNow} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Book Now</button> */}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {services.map(item => (
        <Card key={item.id} imageSrc={item.imgSrc} title={item.title} price={item.price} />
      ))}
    </div>
  </div>

  {/* Right Section */}
  <div className="mx-4 md:w-1/2 mt-24 pl-5 box-border z-[-1]">
    <Carousel fade>
      <Carousel.Item>
        <video
          className="w-full h-[400px] object-cover"
          src="https://videos.pexels.com/video-files/4503298/4503298-sd_506_960_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
        <Carousel.Caption>
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
            <h2 className="text-2xl font-bold text-white">
              Where Gardening meets Expertise!
            </h2>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-full h-[400px] object-cover"
          src="https://media.istockphoto.com/id/978997308/photo/gardeners-planting-flowers.jpg?s=612x612&w=0&k=20&c=mDqLYQ7Mk1EpBNruehpNAJNAebP3WKPUc2tPD4yMSpo="
          alt="carousel item"
        />
        <Carousel.Caption>
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
            <h2 className="text-2xl font-bold text-white">
              Gardening Excellence, Delivered
            </h2>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-full h-[400px] object-cover"
          src="https://media.istockphoto.com/id/1194461958/photo/bush-trimming-with-electrically-powered-chain-saw.jpg?s=612x612&w=0&k=20&c=2HMPZq4JoqpAWv3Ez6QUPj-kw3XVH0PNjnTpER9-C7M="
          alt="carousel item"
        />
        <Carousel.Caption>
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
            <h2 className="text-2xl font-bold text-white">Transform Your Garden with Ease</h2>
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
We provide a range of reliable gardening services to transform your outdoor space:</p>
<ul className="list-none mt-4 space-y-2">
  <li className="flex items-center">
    <i class="fas fa-seedling mr-2 text-green-600"></i> Garden Design
  </li>
  <li className="flex items-center">
    <i class="fas fa-cut mr-2 text-amber-500"></i> Hedge Trimming
  </li>
  <li className="flex items-center">
    <i class="fas fa-tractor mr-2 text-green-700"></i> Lawn Mowing
  </li>
  <li className="flex items-center">
    <i class="fas fa-tree mr-2 text-brown-600"></i> Tree Pruning
  </li>
  <li className="flex items-center">
    <i class="fas fa-leaf mr-2 text-yellow-500"></i> Weed Control
  </li>
</ul>

    <Reviews serviceName={"Gardening Services"}/>
  </div>
  <div className="flex flex-col mx-4 md:w-1/2">
        <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
  <div className="flex-6">
    <Details services={services} service_name={"Gardening Services"} />
  </div>
  </div>
</div>

      
    </>
  );
};

export default Gardening;
