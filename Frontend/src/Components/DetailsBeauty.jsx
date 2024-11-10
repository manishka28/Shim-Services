import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Login from './Login'; // Import the Login component
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DetailsBeauty = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false); // New state for login dialog
  const [selectedService, setSelectedService] = useState(null);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  // const services = [
  //   {
  //     id: 1,
  //     imgSrc: 'https://media.istockphoto.com/id/1055099140/photo/making-hairstory-everyday-with-gorgeous-hair.jpg?s=612x612&w=0&k=20&c=x-Hxtr85HmZ_U5o7-KNzLCNi63drTeijFnuFcpz5kUU=',
  //     title: 'Hair Styling',
  //     description: [
  //       'Precision Haircut',
  //       'Blowdry & Styling',
  //       'Coloring & Highlights'
  //     ],
  //     price: 40
  //   },
  //   {
  //     id: 2,
  //     imgSrc: 'https://cdn.pixabay.com/photo/2024/04/02/06/47/woman-8670155_1280.png',
  //     title: 'Bridal Makeup',
  //     description: [
  //       'Traditional Bridal Look',
  //       'Airbrush Makeup',
  //       'Hairstyling & Accessories'
  //     ],
  //     price: 50
  //   },
  //   {
  //     id: 3,
  //     imgSrc: 'https://media.istockphoto.com/id/1303337467/photo/beautiful-young-asian-woman-holding-hands-smile-feeling-so-happy-and-cheerful-with-healthy.jpg?s=612x612&w=0&k=20&c=3wuVMmBCzda1HXNqwfex5FuCl6dJ7Cu2xHojIVHFL5g=',
  //     title: 'Facial Treatment',
  //     description: [
  //       'Hydrating Facial',
  //       'Anti-aging Facial',
  //       'Acne Treatment'
  //     ],
  //     price: 35
  //   },
  //   {
  //     id: 4,
  //     imgSrc: 'https://media.istockphoto.com/id/171328031/photo/beautiful-female-hands-with-manicure.jpg?s=612x612&w=0&k=20&c=CcNWRsYli6xO4vCmds7lQXIHVjsXsWffD7MDIxVH7U8=',
  //     title: 'Manicure/Pedicure',
  //     description: [
  //       'Classic Manicure',
  //       'Spa Pedicure',
  //       'Nail Art & Extensions'
  //     ],
  //     price: 40
  //   },
  //   {
  //     id: 5,
  //     imgSrc: 'https://cdn.pixabay.com/photo/2019/10/11/12/33/make-up-4541782_1280.jpg',
  //     title: 'Eyebrow Threading',
  //     description: [
  //       'Full Face Threading',
  //       'Eyebrow Shaping',
  //       'Upper Lip & Chin'
  //     ],
  //     price: 25
  //   },
  //   {
  //     id: 6,
  //     imgSrc: 'https://media.istockphoto.com/id/486859959/photo/eyelash-extension.jpg?s=612x612&w=0&k=20&c=ztA2zj0Pjtx53bVcwLZWt8bFRtM5vN6gxpOyzyU6R2w=',
  //     title: 'Eyelash Extension',
  //     description: [
  //       'Lash Extensions',
  //       'Deep Cleansing',
  //       'Microdermabrasion'
  //     ],
  //     price: 75
  //   },
  //   {
  //     id: 7,
  //     imgSrc: 'https://media.istockphoto.com/id/1366228042/photo/facial-aesthetics-surgery-treatment.jpg?s=612x612&w=0&k=20&c=7zOyHVSkG1FrdqUqG1jXWWdPquSKXotFbvujX1SwPyw=',
  //     title: 'Skin Care Treatment',
  //     description: [
  //       'Beard Shaping',
  //       'Trimming & Styling',
  //       'Beard Oil Treatment'
  //     ],
  //     price: 45
  //   },
  //   {
  //     id: 8,
  //     imgSrc: 'https://media.istockphoto.com/id/504242575/photo/total-bliss.jpg?s=612x612&w=0&k=20&c=LNDbygaPEdFC2OmjS3ibjSjmEMVVEM7YCb8wtXRWWVM=',
  //     title: 'Facial Treatment',
  //     description: [
  //       'Hydrating Facial for Men',
  //       'Anti-aging Treatment',
  //       'Exfoliation & Cleansing'
  //     ],
  //     price: 35
  //   }
  // ];
  const openDialog = (service) => {
    setSelectedService(service);
    if (isAuth) {
      setIsDialogOpen(true);
    } else {
      setIsLoginDialogOpen(true); // Open login dialog if not authenticated
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
  };

  const closeLoginDialog = () => {
    setIsLoginDialogOpen(false);
    if (isAuth) {
      setIsDialogOpen(true); // Open booking dialog after successful login
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center justify-between border border-black rounded-lg p-4 transition-transform duration-300 hover:scale-105 mt-2"
          >
            <div className="pb-2">
              <img
                src={service.imgSrc}
                className="h-40 w-40 rounded-lg"
                alt="service-img"
              />
            </div>
            <div className="pl-2 text-left">
              <p className="text-green-600">30-DAY WARRANTY</p>
              <h5 className="font-bold">{service.title}</h5>
              <ul className="list-disc list-inside">
                {service.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              <p className="font-bold text-green-600">
                Initial Price: ₹{service.price}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => openDialog(service)} // Trigger the booking or login dialog
                  className="border-2 border-green-600 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-600 hover:text-white"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && selectedService && (
        <BookingForm
          isOpen={openDialog}
          serviceName="Appliance Repair"
          service={selectedService}
          onClose={closeDialog}
        />
      )}
      {isLoginDialogOpen && (
        <Login closeDialog={closeLoginDialog} /> // Show login dialog
      )}
    </div>
  );
};

export default DetailsBeauty;
