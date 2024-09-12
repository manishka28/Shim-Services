import React from 'react';

const DetailsBeauty = () => {
  const beautyServices = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/1055099140/photo/making-hairstory-everyday-with-gorgeous-hair.jpg?s=612x612&w=0&k=20&c=x-Hxtr85HmZ_U5o7-KNzLCNi63drTeijFnuFcpz5kUU=',
      title: 'Hair Styling',
      description: [
        'Haircut',
        'Blowdry & Styling',
        'Coloring & Highlights'
      ]
    },
    {
      id: 2,
      imgSrc: 'https://cdn.pixabay.com/photo/2024/04/02/06/47/woman-8670155_1280.png',
      title: 'Bridal Makeup',
      description: [
        'Traditional Bridal Look',
        'Airbrush Makeup',
        'Hairstyling & Accessories'
      ]
    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1303337467/photo/beautiful-young-asian-woman-holding-hands-smile-feeling-so-happy-and-cheerful-with-healthy.jpg?s=612x612&w=0&k=20&c=3wuVMmBCzda1HXNqwfex5FuCl6dJ7Cu2xHojIVHFL5g=',
      title: 'Facial Treatment',
      description: [
        'Hydrating Facial',
        'Anti-aging Facial',
        'Acne Treatment Facial'
      ]
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/171328031/photo/beautiful-female-hands-with-manicure.jpg?s=612x612&w=0&k=20&c=CcNWRsYli6xO4vCmds7lQXIHVjsXsWffD7MDIxVH7U8=',
      title: 'Manicure/Pedicure',
      description: [
        'Classic Manicure',
        'Spa Pedicure',
        'Nail Art & Extensions'
      ]
    },
    {
      id: 5,
      imgSrc: 'https://cdn.pixabay.com/photo/2019/10/11/12/33/make-up-4541782_1280.jpg',
      title: 'Eyebrow Threading',
      description: [
        'Full Face Threading',
        'Eyebrow Shaping',
        'Upper Lip & Chin Threading'
      ]
    },
    {
      id: 6,
      imgSrc: 'https://media.istockphoto.com/id/1355309866/photo/gorgeous-brown-haired-woman-with-the-fresh-skin-and-delicate-makeup-is-closed-eyes-with-fill.jpg?s=612x612&w=0&k=20&c=19jbxy3WTDdaeZ2F9sa_UrOObfKdGWmMnqBQtjHl8h0=',
      title: 'Body Treatment',
      description: [
        'Deep Cleansing Treatment',
        'Microdermabrasion',
        'Chemical Peels'
      ]
    },
    
    {
      id: 7,
      imgSrc: 'https://cdn.pixabay.com/photo/2020/05/24/01/53/barber-5212050_1280.jpg',
      title: 'Beard Grooming',
      description: [
        'Beard Shaping',
        'Beard Trimming & Styling',
        'Beard Oil & Care Treatment'
      ]
    },
    {
      id: 8,
      imgSrc: 'https://media.istockphoto.com/id/1365603326/photo/shot-of-a-handsome-young-man-enjoying-a-facial-at-a-spa.jpg?s=612x612&w=0&k=20&c=ESiGLijRwohSdCDg0bumxTq2scz7qk54LMjKOPYxpCI=',
      title: 'Men’s Facial Treatment',
      description: [
        'Hydrating Facial for Men',
        'Anti-aging Facial',
        'Exfoliation & Cleansing'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
      {beautyServices.map((service) => (
        <div
          key={service.id}
          className="flex flex-col items-center justify-between border border-black rounded-lg p-4 transition-transform duration-300 hover:scale-105 mt-2"
        >
          <div className="pb-2">
            <img
              src={service.imgSrc}
              className="w-40 h-40 rounded-lg"
              alt="service-img"
            />
          </div>
          <div className="pl-2 text-left">
            <p className="text-pink-600">POPULAR SERVICE</p>
            <h5 className="font-bold">{service.title}</h5>
            <ul className="list-disc list-inside">
              {service.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
            <div className="mt-2">
              <button className="border-2 border-pink-600 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-pink-600 hover:text-white">
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsBeauty;
