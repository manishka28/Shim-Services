import React from 'react';

const DetailsHouseCleaning = () => {
  const houseCleaningServices = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/1219350156/photo/exterminator-hygiene-disinfection.jpg?s=612x612&w=0&k=20&c=zVtcksCoX_yLCSTM9gCsItzXcD-X2xhrdjNEb3k6qBM=',
      title: 'Home Cleaning',
      description: [
        'Dusting & Vacuuming',
        'Mopping & Sanitizing',
        'Kitchen & Bathroom Cleaning'
      ]
    },
    {
      id: 2,
      imgSrc: 'https://media.istockphoto.com/id/1393767111/photo/young-female-cleaner-in-workwear-using-mop-while-cleaning-floor-in-office.jpg?s=612x612&w=0&k=20&c=T8ZAIpzwVSVLmegTR4l2cSDcs9hVktkmS5CDWlf52M4=',
      title: 'Office Cleaning',
      description: [
        'Desk & Floor Cleaning',
        'Trash Removal',
        'Disinfecting Workspaces'
      ]
    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1167411789/photo/person-cleaning-stain-on-carpet.jpg?s=612x612&w=0&k=20&c=Nhf9uDH5VoW0-3j5KJ_sfBlr7TgQfhI3FCuEtpWzEg4=',
      title: 'Carpet Cleaning',
      description: [
        'Stain Removal',
        'Deep Cleaning',
        'Odor Elimination'
      ]
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/2164840232/photo/beautiful-smiling-young-woman-cleaning-window-with-window-cleaner.jpg?s=612x612&w=0&k=20&c=6eqocDJF9QImCO3PaEEtxXx64GJ5oeR1mziT0XQIOCU=',
      title: 'Window Cleaning',
      description: [
        'Interior Window Cleaning',
        'Exterior Window Washing',
        'Streak-Free Shine'
      ]
    },
    {
      id: 5,
      imgSrc: 'https://media.istockphoto.com/id/1789004313/photo/a-young-man-vacuums-the-landing-in-a-repair-room.jpg?s=612x612&w=0&k=20&c=PZONQhDiTZqyDzsu1PI7PQKmw1eG25cWzx955DS8Xno=',
      title: 'Post-Construction Cleaning',
      description: [
        'Debris Removal',
        'Dusting & Mopping',
        'Detailed Finishing Cleanup'
      ]
    },
    {
      id: 6,
      imgSrc: 'https://media.istockphoto.com/id/1188875709/photo/movers-placing-furniture-at-home.jpg?s=612x612&w=0&k=20&c=_W3fewM45MkVAkC-_pa_od725e-kJKKGoprfQX0GwX0=',
      title: 'Move-In/Move-Out Cleaning',
      description: [
        'Full House Cleaning',
        'Trash Removal',
        'Deep Cleaning of All Rooms'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
      {houseCleaningServices.map((service) => (
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
            <p className="text-green-600">POPULAR SERVICE</p>
            <h5 className="font-bold">{service.title}</h5>
            <ul className="list-disc list-inside">
              {service.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
            <div className="mt-2">
              <button className="border-2 border-green-600 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-600 hover:text-white">
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsHouseCleaning;