import React, { useRef, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Reviews } from './Reviews';
import DetailsBeauty from './DetailsBeauty';

const Card = ({ imageSrc, title }) => (
  <div className="m-4 p-1 text-center w-30 h-32 text-gray-900 transition-shadow duration-300 overflow-visible hover:shadow-lg">
    <img src={imageSrc} alt="card" className="w-full h-full object-cover" />
    <p className="mt-1">{title}</p>
  </div>
);

const Beauty = () => {
  const cardItems = [
    { id: 1, imageSrc: 'https://cdn.pixabay.com/photo/2018/04/03/23/04/woman-3288365_1280.jpg', title: 'Hair Styling' },
    { id: 2, imageSrc: 'https://cdn.pixabay.com/photo/2020/03/30/18/31/portrait-4985147_1280.jpg', title: 'Bridal Makeup' },
    { id: 3, imageSrc: 'https://cdn.pixabay.com/photo/2021/08/19/09/18/woman-6557552_1280.jpg', title: 'Facial Treatment' },
    { id: 4, imageSrc: 'https://cdn.pixabay.com/photo/2015/07/28/22/06/nails-865121_1280.jpg', title: 'Manicure/Pedicure' },
    { id: 5, imageSrc: 'https://cdn.pixabay.com/photo/2019/10/11/12/33/make-up-4541782_1280.jpg', title: 'Eyebrow Threading' },
    { id: 6, imageSrc: 'https://cdn.pixabay.com/photo/2020/03/08/14/53/makeup-4912678_1280.jpg', title: 'Skin Care Treatment' },
  ];

  const leftSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const stickyOffset = leftSectionRef.current.offsetTop;
      if (window.scrollY > stickyOffset) {
        leftSectionRef.current.classList.add('sticky');
      } else {
        leftSectionRef.current.classList.remove('sticky');
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
            <h2 className="text-5xl font-extrabold text-center mb-4">Beauty Services</h2>
            <p className="mt-2">
              Elevate Your Glamour. Step into ShimServices' World: Where Beauty is Celebrated, Confidence Reigns!
            </p>
            <div className="flex items-center underline">
              <img
                src="https://t3.ftcdn.net/jpg/04/20/03/48/360_F_420034841_AKpgqQGkkUyeD7oWc9y8vGTMwT4GmbHm.jpg"
                className="h-5 w-20 mt-2"
                alt="rating"
              />
              <p className="ml-2">6M+ bookings till now</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cardItems.map((item) => (
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
                src="https://videos.pexels.com/video-files/8830239/8830239-uhd_3840_2160_25fps.mp4"
                autoPlay
                muted
                loop
                playsInline
              ></video>
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Discover Your ShimStyle: Unveil Beauty, Embrace Grace</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-full h-[400px] object-cover"
                src="https://cdn.pixabay.com/photo/2020/08/30/14/57/beautician-5529805_1280.jpg"
                alt="carousel item"
              />
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Discover ShimmerSculpt, Where Elegance Reigns</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-full h-[400px] object-cover"
                src="https://cdn.pixabay.com/photo/2017/07/31/22/59/salon-2561845_1280.jpg"
                alt="carousel item"
              />
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
          <hr></hr>
          <h2 className="font-bold text-center mt-4">What we offer</h2>
          <div>
          <div className="mb-4">
  At ShimServices, we offer a range of beauty services to elevate your look and boost your confidence. Whether it's a big event or self-care, our services include:
  
  <ul className="list-disc list-inside mt-4">
    <li><strong>Hair Styling:</strong> Trendy cuts, coloring, and highlights to refresh your look.</li>
    
    <li><strong>Bridal Makeup:</strong> Flawless makeup to make your special day perfect.</li>
    
    <li><strong>Facial Treatments:</strong> Hydrating, anti-aging, and customized facials for glowing skin.</li>
    
    <li><strong>Manicure & Pedicure:</strong> Luxurious nail care, from classic to intricate nail art.</li>
    
    <li><strong>Threading & Waxing:</strong> Precise shaping and smooth skin with professional care.</li>
    
    <li><strong>Men's Grooming:</strong> Tailored grooming services including beard trims and facials.</li>
  </ul>

  Let us help you look and feel your best at ShimServices!
</div>

            <hr></hr>
            <div className="mt-4">
              <Reviews />
            </div>
          </div>
        </div>
        <div className="flex-6">
          <DetailsBeauty/>
        </div>
      </div>
    </>
  );
};

export default Beauty;
