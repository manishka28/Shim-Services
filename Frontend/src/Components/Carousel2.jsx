import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    <div className='bg-yellow-200 bg-opacity-60 p-8 rounded-lg shadow-lg max-w-4xl mx-auto'>
      <Slider {...settings}>
        <div className='text-center'>
          <img
            src="https://cdn.pixabay.com/photo/2024/03/06/12/13/ev-charger-installation-in-essex-8616406_640.png"
            alt="Slide 1"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-gray-700 mt-4">EV Charger Installation</p>
        </div>
        <div className='text-center'>
          <img
            src="http://ictsps.com/wp-content/uploads/2018/01/it-support-services-berkshire.jpg"
            alt="Slide 2"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-gray-700 mt-4">IT Support Services</p>
        </div>
        <div className='text-center'>
          <img
            src="https://cdn.pixabay.com/photo/2020/01/05/20/06/lipstick-4743984_960_720.jpg"
            alt="Slide 3"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-gray-700 mt-4">Makeup Services</p>
        </div>
        <div className='text-center'>
          <img
            src="https://media.istockphoto.com/id/1387759698/photo/hand-of-car-mechanic-with-wrench-auto-repair-garage-mechanic-works-on-the-engine-of-the-car.jpg?s=612x612&w=0&k=20&c=JVYyKMvP-NN-bTMyIF-pNrifwvjyjKcIRjTVEmSmPsM="
            alt="Slide 4"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-gray-700 mt-4">Car Mechanic Services</p>
        </div>
        <div className='text-center'>
          <img
            src="https://media.istockphoto.com/id/509040406/photo/painter-painting-a-wall-with-paint-roller.jpg"
            alt="Slide 5"
            className="w-100 h-64 object-cover mx-auto"
          />
          <p className="text-gray-700 mt-4">Painting Services</p>
        </div>
      </Slider>

      {/* Fixed button below the carousel */}
      <div className="mt-8 flex justify-center">
        <button className="bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded-lg">
          Become a Service Provider
        </button>
      </div>
    </div>
  );
};

export default Carousel2;
