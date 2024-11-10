import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Carousel2 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='bg-white/10 backdrop-blur-sm bg-opacity-60 p-8 rounded-lg shadow-lg max-w-4xl mx-auto'>
      <Slider {...settings}>
        <div className='text-center'>
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.-fuLAFDgBJCcY77p8jEw9QHaDt&pid=Api&P=0&h=180"
            alt="Slide 1"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-white text-2xl font-serif mt-4">Cleaning</p>
        </div>
        <div className='text-center'>
          <img
            src="http://ictsps.com/wp-content/uploads/2018/01/it-support-services-berkshire.jpg"
            alt="Slide 2"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-white text-2xl font-serif mt-4">IT Support Services</p>
        </div>
        <div className='text-center'>
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.xBvPXJb1cO3coFGWDG4CYgHaE8&pid=Api&P=0&h=180"
            alt="Slide 3"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-white text-2xl font-serif mt-4">Plumbing Services</p>
        </div>
        <div className='text-center'>
          <img
            src="https://media.istockphoto.com/id/1387759698/photo/hand-of-car-mechanic-with-wrench-auto-repair-garage-mechanic-works-on-the-engine-of-the-car.jpg?s=612x612&w=0&k=20&c=JVYyKMvP-NN-bTMyIF-pNrifwvjyjKcIRjTVEmSmPsM="
            alt="Slide 4"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-white text-2xl font-serif mt-4">Car Mechanic Services</p>
        </div>
        <div className='text-center'>
          <img
            src="https://media.istockphoto.com/id/509040406/photo/painter-painting-a-wall-with-paint-roller.jpg?s=612x612&w=0&k=20&c=XRAosOBMqY1WKs_j2Bdt_rlH45-aXu74kMpkfaf5klU="
            alt="Slide 5"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-white text-2xl font-serif mt-4">Painting Services</p>
        </div>
      </Slider>

      {/* Fixed button below the carousel */}
      <div className="mt-8 flex justify-center">
        
     
   
      </div>
    </div>
  );
};

export default Carousel2;
