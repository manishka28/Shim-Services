import { AiFillStar, AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import React from "react";

export const Reviews = () => {
  const [showMore, setShowMore] = React.useState({});

  const toggleShowMore = (technician) => {
    setShowMore((prevState) => ({
      ...prevState,
      [technician]: !prevState[technician],
    }));
  };

  const technicians = [
    {
      name: "Sajid Saifi",
      location: "Saket, New Delhi, Delhi, India",
      rating: 4.7,
      image: "https://res.cloudinary.com/urbanclap/image/upload/t_medium_res_profile_thumb,q_auto:low,f_auto/images/5c0df5942e506e26001c19ea/1544427470485-9de668412835c3affe92a75fff0c7f0a.jpeg",
      reviews: [
        {
          reviewer: "Sanjay",
          rating: 5.0,
          review: "Thank you for a timely visit and service of my AC. I have paid in cash the balance amount. Thank you!",
        },
        {
          reviewer: "Amit",
          rating: 4.8,
          review: "Great service! Very professional and punctual.",
        },
      ],
    },
    {
      name: "Rahul Kumar",
      location: "Connaught Place, New Delhi, India",
      rating: 4.5,
      image: "https://res.cloudinary.com/urbanclap/image/upload/t_medium_res_profile_thumb,q_auto:low,f_auto/images/profile.jpg",
      reviews: [
        {
          reviewer: "Rohan",
          rating: 4.5,
          review: "Very helpful and friendly service. Got my AC fixed in no time.",
        },
        {
          reviewer: "Rita",
          rating: 4.2,
          review: "Service was satisfactory, but could be more punctual.",
        },
      ],
    },
    {
      name: "Aman Verma",
      location: "South Extension, New Delhi, India",
      rating: 4.9,
      image: "https://res.cloudinary.com/urbanclap/image/upload/t_medium_res_profile_thumb,q_auto:low,f_auto/images/profile2.jpg",
      reviews: [
        {
          reviewer: "Anjali",
          rating: 5.0,
          review: "Amazing service. Very thorough and polite.",
        },
        {
          reviewer: "Mehul",
          rating: 4.9,
          review: "Best service I have experienced in a while. Highly recommended.",
        },
      ],
    },
  ];

  return (
    <>
      <h2 id="technicians" className="text-2xl font-bold my-4 text-center">Ratings & Reviews</h2>
      <ul className="list-none m-0 p-0">
        {technicians.map((tech, index) => (
          <li key={index} className="mb-6">
            <div className="flex items-start space-x-4 p-4 border-b border-gray-200">
              {/* Technician Info */}
              <div className="flex-shrink-0">
                <img
                  src={tech.image}
                  alt="Technician"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-semibold">{tech.name}</h4>
                <p className="text-sm text-gray-600">{tech.location}</p>
                <div className="flex items-center mt-2">
                  <AiFillStar className="text-yellow-500" />
                  <span className="ml-1 text-green-700 font-bold">{tech.rating}</span>
                  <span className="ml-2 text-sm">({tech.reviews.length} reviews)</span>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="p-4">
              <ul className="list-none space-y-4">
                {/* Show first review by default */}
                <li>
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      {/* Avatar or placeholder */}
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-700">{tech.reviews[0].reviewer[0]}</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold">{tech.reviews[0].reviewer}</h4>
                      <div className="flex items-center mb-1">
                        <AiFillStar className="text-yellow-500" />
                        <span className="ml-1 text-green-700 font-bold">{tech.reviews[0].rating}</span>
                      </div>
                      <p className="text-sm">{tech.reviews[0].review}</p>
                    </div>
                  </div>
                </li>

                {/* Conditionally render more reviews */}
                {showMore[tech.name] &&
                  tech.reviews.slice(1).map((review, idx) => (
                    <li key={idx}>
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0">
                          {/* Avatar or placeholder */}
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-700">{review.reviewer[0]}</span>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold">{review.reviewer}</h4>
                          <div className="flex items-center mb-1">
                            <AiFillStar className="text-yellow-500" />
                            <span className="ml-1 text-green-700 font-bold">{review.rating}</span>
                          </div>
                          <p className="text-sm">{review.review}</p>
                        </div>
                      </div>
                    </li>
                  ))}

                {/* Toggle button */}
                <li>
                  <button
                    onClick={() => toggleShowMore(tech.name)}
                    className="flex items-center text-blue-600 mt-4"
                  >
                    <div className="mr-1">
                      {showMore[tech.name] ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </div>
                    <span>{showMore[tech.name] ? "Show Less" : "Click to Read More Reviews"}</span>
                  </button>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Reviews;
