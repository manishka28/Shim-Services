import React, { useRef, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Reviews } from './Reviews';
import Details from './Details';
// import DetailsBeauty from './DetailsBeauty';

const Card = ({ imageSrc, title }) => (
  <div className="m-4 p-1 text-center w-30 h-32 text-gray-900 transition-shadow duration-300 overflow-visible hover:shadow-lg">
    <img src={imageSrc} alt="card" className="w-full h-full object-cover" />
    <p className="mt-1">{title}</p>
  </div>
);


const Beauty = () => {

  const services = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/1055099140/photo/making-hairstory-everyday-with-gorgeous-hair.jpg?s=612x612&w=0&k=20&c=x-Hxtr85HmZ_U5o7-KNzLCNi63drTeijFnuFcpz5kUU=',
      title: 'Hair Styling ',
      description: [
        'Precision Haircut',
        'Blowdry & Styling',
        'Coloring & Highlights'
      ],
      price: 599,
       rating: 5,
       review: 40
    },
    {
      id: 2,
      imgSrc: 'https://cdn.pixabay.com/photo/2024/04/02/06/47/woman-8670155_1280.png',
      title: 'Bridal Makeup',
      description: [
        'Traditional Bridal Look',
        'Airbrush Makeup',
        'Hairstyling & Accessories'
      ],
      price: 5999,
       rating: 4.6,
       review: 130
    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1303337467/photo/beautiful-young-asian-woman-holding-hands-smile-feeling-so-happy-and-cheerful-with-healthy.jpg?s=612x612&w=0&k=20&c=3wuVMmBCzda1HXNqwfex5FuCl6dJ7Cu2xHojIVHFL5g=',
      title: 'Facial Treatment ',
      description: [
        'Hydrating Facial',
        'Anti-aging Facial',
        'Acne Treatment'
      ],
      price: 699,
       rating: 3.7,
       review: 80
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/171328031/photo/beautiful-female-hands-with-manicure.jpg?s=612x612&w=0&k=20&c=CcNWRsYli6xO4vCmds7lQXIHVjsXsWffD7MDIxVH7U8=',
      title: 'Manicure/Pedicure ',
      description: [
        'Classic Manicure',
        'Spa Pedicure',
        'Nail Art & Extensions'
      ],
      price: 899,
       rating: 5,
       review: 50
    },
    {
      id: 5,
      imgSrc: 'https://cdn.pixabay.com/photo/2019/10/11/12/33/make-up-4541782_1280.jpg',
      title: 'Eyebrow Threading',
      description: [
        'Full Face Threading',
        'Eyebrow Shaping',
        'Upper Lip & Chin'
      ],
      price: 69,
       rating: 4.7,
       review: 90
    },
    {
      id: 6,
      imgSrc: 'https://media.istockphoto.com/id/486859959/photo/eyelash-extension.jpg?s=612x612&w=0&k=20&c=ztA2zj0Pjtx53bVcwLZWt8bFRtM5vN6gxpOyzyU6R2w=',
      title: 'Eyelash Extensions ',
      description: [
        'Lash Extensions',
        'Deep Cleansing',
        'Microdermabrasion'
      ],
      price: 59,
       rating: 2.8,
       review: 35
    },
    {
      id: 7,
      imgSrc: 'https://media.istockphoto.com/id/1366228042/photo/facial-aesthetics-surgery-treatment.jpg?s=612x612&w=0&k=20&c=7zOyHVSkG1FrdqUqG1jXWWdPquSKXotFbvujX1SwPyw=',
      title: 'Skin Care Treatment',
      description: [
        'Beard Shaping',
        'Trimming & Styling',
        'Beard Oil Treatment'
      ],
      price: 2999,
       rating: 4.1,
       review:29
    },
    {
      id: 8,
      imgSrc: 'https://media.istockphoto.com/id/504242575/photo/total-bliss.jpg?s=612x612&w=0&k=20&c=LNDbygaPEdFC2OmjS3ibjSjmEMVVEM7YCb8wtXRWWVM=',
      title: 'Facial Treatment ',
      description: [
        'Hydrating Facial for Men',
        'Anti-aging Treatment',
        'Exfoliation & Cleansing'
      ],
      price: 699,
       rating: 3.7,
       review: 80
    },
    {
      id: 9,
      imgSrc: 'https://media.istockphoto.com/id/1263295220/photo/a-beautician-waxes-a-womans-leg-in-a-salon-beautiful-female-legs-preparing-bodies-for-the.jpg?s=612x612&w=0&k=20&c=WSyTasjZDVouyCI_ndDiJvhZCcGCairj56lwM1XIHqQ=',
      title: 'Body Waxing',
      description: [
        'Full Body Waxing for Smooth Skin',
        'Gentle Hair Removal with Soothing Wax',
        'Includes Exfoliation & Post-Wax Care'
      ],
      
      price: 699,
       rating: 3.7,
       review: 80
    }
  ];
  
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
      <hr />
      <h2 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-2">What We Offer</h2>
      <p className="text-lg text-center text-gray-600 mb-4">
        At ShimServices, we offer a range of beauty services to elevate your look and boost your confidence. Whether it’s a big event or self-care, our services include:
      </p>

      <ul className="list-none space-y-3 text-gray-700 mt-4">
        <li className="flex items-center">
          <i className="fas fa-cut text-pink-600 mr-2"></i>
          <span className="font-medium text-lg">Hair Styling</span>
        </li>
        <li className="flex items-center">
          <i className="fas fa-spa text-red-600 mr-2"></i>
          <span className="font-medium text-lg">Bridal Makeup</span>
        </li>
        <li className="flex items-center">
          <i className="fas fa-leaf text-green-600 mr-2"></i>
          <span className="font-medium text-lg">Facial Treatments</span>
        </li>
        <li className="flex items-center">
          <i className="fas fa-hand-sparkles text-yellow-500 mr-2"></i>
          <span className="font-medium text-lg">Manicure & Pedicure</span>
        </li>
        <li className="flex items-center">
          <i className="fas fa-archway text-purple-600 mr-2"></i>
          <span className="font-medium text-lg">Threading & Waxing</span>
        </li>
        <li className="flex items-center">
          <i className="fas fa-male text-blue-600 mr-2"></i>
          <span className="font-medium text-lg">Men's Grooming</span>
        </li>
      </ul>

  

            <hr></hr>
            <div className="mt-4">
              <Reviews serviceName={"Beauty Services"} />
            </div>
          </div>
          <div className="flex flex-col mx-4 md:w-1/2">
          <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
        <div className="flex-6">
          
          <Details services={services} service_name={"Beauty Services"}/>
        </div>
        </div>
        </div>
    </>
  );
};

export default Beauty;
