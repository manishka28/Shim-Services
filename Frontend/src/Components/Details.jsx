import React from 'react';

const Details = () => {
  const services = [
    {
      id: 1,
      imgSrc: 'https://5.imimg.com/data5/CX/LD/MY-34021272/duct-ac-service-500x500.jpg',
      title: 'Power Saver AC Service',
      description: [
        'Advanced jet-technology service',
        'Deep jet cleaning of outdoor units'
      ]
    },
    {
      id: 2,
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThf6ou9ZEt19JPPZtaTeI2bcjfaHRMczbFEbVEjPem8Qwkos-0Pe9RFjRePotO5_uCvJk&usqp=CAU',
      title: 'Power Saver AC Service',
      description: [
        'Advanced jet-technology service',
        'Deep jet cleaning of outdoor units'
      ]
    },
    {
      id: 3,
      imgSrc: 'https://example.com/fridge-repair.jpg',
      title: 'Refrigerator Repair Service',
      description: [
        'Comprehensive refrigerator service',
        'Repair and part replacement'
      ]
    },
    {
      id: 4,
      imgSrc: 'https://example.com/washing-machine-repair.jpg',
      title: 'Washing Machine Repair',
      description: [
        'Expert washing machine repair',
        'Full diagnostic and cleaning'
      ]
    },
    {
      id: 5,
      imgSrc: 'https://example.com/microwave-repair.jpg',
      title: 'Microwave Repair Service',
      description: [
        'Full microwave repair service',
        'Part replacement and safety check'
      ]
    },
    {
      id: 6,
      imgSrc: 'https://example.com/tv-repair.jpg',
      title: 'Television Repair Service',
      description: [
        'Screen and part repair',
        'Full system diagnostic'
      ]
    },
    {
      id: 7,
      imgSrc: 'https://example.com/oven-repair.jpg',
      title: 'Oven Repair Service',
      description: [
        'Oven service and cleaning',
        'Heating element replacement'
      ]
    },
    {
      id: 8,
      imgSrc: 'https://example.com/geyser-repair.jpg',
      title: 'Geyser Repair Service',
      description: [
        'Expert geyser repair',
        'Thermostat and element check'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service) => (
        <div
          key={service.id}
          className=" flex flex-col items-center justify-between border border-black rounded-lg p-4 transition-transform duration-300 hover:scale-105 mt-2"
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
            <div className="mt-2">
              <button className="border-2 border-green-600 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-600 hover:text-white">
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Details;
