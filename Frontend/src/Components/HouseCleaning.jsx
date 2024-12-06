import React, { useRef, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Reviews } from './Reviews';
// import DetailsHouseCleaning from './DetailsHouseCleaning';
import Details from './Details';

const Card = ({ imageSrc, title }) => (
  <div className="m-4 p-1 text-center w-30 h-32 text-gray-900 transition-shadow duration-300 overflow-visible hover:shadow-lg">
    <img src={imageSrc} alt="card" className="w-full h-full object-cover" />
    <p className="mt-1">{title}</p>
  </div>
);

const HouseCleaning = () => {

  const services = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/2032428982/photo/close-up-of-cleaning-sink-with-faucet-in-bathroom-hands-in-gloves-with-detergent.jpg?s=612x612&w=0&k=20&c=rk9QdQLLSiZiaTNLz9fzh3YBQ1fYzvWfNeJDnhZ9YNo=',
      title: 'Bathroom Cleaning',
      description: [
        'Thorough cleaning of all bathroom surfaces and fixtures',
        //'Installation of new faucet systems and upgrades'
      ],
      price:1299
    },
    {
      id: 2,
      imgSrc: 'https://media.istockphoto.com/id/1146967802/photo/person-cleaning-carpet-with-vacuum-cleaner.jpg?s=612x612&w=0&k=20&c=UJC79wrTWavMoIas1vxjmokR7TawUVNZR7XMqMnCaFQ=',
      title: 'Carpet Cleaning',
      description: [
        'Removal of dirt, stains, and odors from carpets',
        //'Use of advanced tools to pinpoint and fix leaks efficiently'
      ],
      price:399
    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1419689809/photo/dirty-water-bubbling-in-the-nozzle-of-washing-vacuum-worker-using-professional-vacuum-cleaner.jpg?s=612x612&w=0&k=20&c=lbVFJ0dx7-6Na9EQXV0brSI1ZJiy0MP16C8DI5kQfMs=',
      title: 'Deep Cleaning',
      description: [
        'Intensive cleaning of all areas, targeting hidden dirt and grime',
        //'Repipe and replacement of worn-out piping systems'
      ],
      price:999
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/1139715687/photo/woman-in-yellow-gloves-washes-the-door-in-kitchen-cabinet.jpg?s=612x612&w=0&k=20&c=zaCCsFK77gTubJymaEiakXuGmHURMI4YyKcq7skVMVQ=',
      title: 'Kitchen Cleaning',
      description: [
        'Cleaning and sanitizing kitchen surfaces, appliances, and floors',
        //'Inspection and pumping of tanks to ensure proper function'
      ],
      price:1399
    },
    {
      id: 5,
      imgSrc: 'https://media.istockphoto.com/id/1368972405/photo/stone-tile-brush-post-construction-floor-cleaning.jpg?s=612x612&w=0&k=20&c=c4TdQU2CvPFSMhxBUfbBrWatKSUs8jPmmqC6zuc_3WY=',
      title: 'Post-Construction Cleaning',
      description: [
        'Cleanup after construction or renovation, removing dust and debris',
        //'Installation and replacement of toilet systems'
      ],
      price:1299
    },
    {
      id: 6,
      imgSrc: 'https://media.istockphoto.com/id/2168865002/photo/a-cleaning-lady-clicks-on-cleaning-icons-on-the-web.jpg?s=612x612&w=0&k=20&c=pYyqoo3ERPDgqPuvNjUp8PlK-mHx0ptp2OZDUweWbDw=',
      title: 'Regular Cleaning',
      description: [
        'Routine cleaning of general living spaces for upkeep',
        //'Inspection and maintenance of water heaters for optimal performance'
      ],
      price:499
    },
    {
      id: 7,
      imgSrc: 'https://media.istockphoto.com/id/1279849148/photo/a-woman-clean-a-window-pane-with-a-rag-and-soap-suds-cleaning-with-a-detergent-hands-in-pink.jpg?s=612x612&w=0&k=20&c=jDoYmgWAzEZoLCrzsOlX_okeZWzmgU8gjxVm1FYWsps=',
      title: 'Window Cleaning',
      description: [
        'Washing and shining windows for a streak-free finish',
        //'Inspection and maintenance of water heaters for optimal performance'
      ],
      price:499
    }
];



  const cardItems = [
    { id: 1, imageSrc: 'https://cdn.pixabay.com/photo/2024/01/16/07/51/ai-generated-8511571_1280.jpg', title: 'Home Cleaning' },
    { id: 2, imageSrc: 'https://cdn.pixabay.com/photo/2021/07/19/04/35/workers-6477163_1280.jpg', title: 'Office Cleaning' },
    { id: 3, imageSrc: 'https://cdn.pixabay.com/photo/2014/02/17/14/28/vacuum-cleaner-268179_1280.jpg', title: 'Carpet Cleaning' },
    { id: 4, imageSrc: 'https://cdn.pixabay.com/photo/2021/01/18/16/56/blinds-5928691_1280.jpg', title: 'Window Cleaning' },
    { id: 5, imageSrc: 'https://cdn.pixabay.com/photo/2022/07/31/18/29/road-7356556_1280.jpg', title: 'Post-Construction Cleaning' },
    { id: 6, imageSrc: 'https://cdn.pixabay.com/photo/2017/01/31/12/58/graffiti-2023845_1280.jpg', title: 'Move-In/Move-Out Cleaning' },
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
            <h2 className="text-5xl font-extrabold text-center mb-4">House Cleaning Services</h2>
            <p className="mt-2">
              Experience ShimServices' superior house cleaning—efficiency, thoroughness, and a commitment to pristine living spaces.
            </p>
            <div className="flex items-center underline">
              <img
                src="https://t3.ftcdn.net/jpg/04/20/03/48/360_F_420034841_AKpgqQGkkUyeD7oWc9y8vGTMwT4GmbHm.jpg"
                className="h-5 w-20 mt-2"
                alt="rating"
              />
              <p className="ml-2">2M+ satisfied clients</p>
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
                src="https://videos.pexels.com/video-files/6196256/6196256-uhd_2560_1440_25fps.mp4"
                autoPlay
                muted
                loop
                playsInline
              ></video>
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Discover ShimServices: Where Clean Meets Comfort</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-full h-[400px] object-cover"
                src="https://cdn.pixabay.com/photo/2024/03/28/05/50/cleaning-8660309_1280.jpg"
                alt="carousel item"
              />
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Thorough Cleaning for Your Peace of Mind</h2>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-full h-[400px] object-cover"
                src="https://cdn.pixabay.com/photo/2023/12/17/09/47/door-8453898_1280.jpg"
                alt="carousel item"
              />
              <Carousel.Caption>
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-md">
                  <h2 className="text-2xl font-bold text-white">Clean Spaces for Healthier Living</h2>
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
       
          <div>
            <div className="mb-4">
            
              <h2 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-2">What We Offer</h2>
<p className="text-lg text-center text-gray-600 mb-4">
  ShimServices provides professional cleaning services for homes and offices.
</p>
<ul className="list-none space-y-3 text-gray-700 mt-4">
  <li className="flex items-center">
    <i className="fas fa-home text-blue-600 mr-2"></i>
    <span className="font-medium text-lg">Home Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-briefcase text-gray-600 mr-2"></i>
    <span className="font-medium text-lg">Office Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-carpet text-red-600 mr-2"></i>
    <span className="font-medium text-lg">Carpet Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-window-maximize text-green-600 mr-2"></i>
    <span className="font-medium text-lg">Window Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-hard-hat text-yellow-500 mr-2"></i>
    <span className="font-medium text-lg">Post-Construction Cleaning</span>
  </li>
  <li className="flex items-center">
    <i className="fas fa-arrow-alt-circle-right text-purple-600 mr-2"></i>
    <span className="font-medium text-lg">Move-In/Move-Out Cleaning</span>
  </li>
</ul>


             
            </div>
            <hr></hr>
            <div className="mt-4">
              <Reviews serviceName={"House Cleaning"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-4 md:w-1/2">
        <h2 className='font-bold text-center mt-4 mb-2 text-3xl text-gray-800'>Schedule Your Service Today!</h2>
        <div className="flex-6">
       
        <Details services={services} service_name={"House Cleaning"} />
        </div>
        </div>
      </div>
    </>
  );
};

export default HouseCleaning;
