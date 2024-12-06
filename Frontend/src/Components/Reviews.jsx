import { AiFillStar } from "react-icons/ai";  
import React, { useState, useEffect } from "react";
import axios from "axios";

export const Reviews = ({ serviceName }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsGrouped, setReviewsGrouped] = useState({}); // Grouped reviews by SP
  const [showAllSPs, setShowAllSPs] = useState(false);
  const [showMore, setShowMore] = useState({}); // State to control showing more reviews for each SP

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:4002/reviews/${serviceName}`);
        const reviewsData = response.data.reviews;
        setReviews(reviewsData);

        // Calculate rating distribution and average rating
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let totalRating = 0;
        reviewsData.forEach((review) => {
          distribution[review.Rating] += 1;
          totalRating += review.Rating;
        });

        setRatingDistribution(distribution);
        setAverageRating(totalRating / reviewsData.length);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [serviceName]);

  const totalReviews = reviews.length;

  const ratingLabels = {
    5: "Excellent",
    4: "Good",
    3: "Average",
    2: "Below Average",
    1: "Poor",
  };

  // Show only the first 4 reviews initially, or all if showMore is true
  const reviewsToDisplay = showMore ? reviews : reviews.slice(0, 4);

  useEffect(() => {
    const fetchReviewsforSP = async () => {
      try {
        // Construct the URL directly without encoding
        const responseURL = `http://localhost:4002/ratings-for-sp/${serviceName}`;
        
        // Fetch data from the API
        const response = await axios.get(responseURL);
        // console.log(responseURL); // Log the URL to verify it's correct
        // console.log("Response for rating:", response.data); // Log the full response for debugging
        
        const reviewsData = response.data.ratings;
        // console.log("reviews data",reviewsData);
        

        if (reviewsData) {
          // Group reviews by SP_Email
          const grouped = reviewsData.reduce((acc, review) => {
            if (!acc[review.SP_Email]) {
              acc[review.SP_Email] = {
                spName: review.SP_Name, // Ensure SP_Name is included here
                avgRating: parseFloat(review.Avg_Rating),
                reviews: [],
              };
            }
            acc[review.SP_Email].reviews.push(review);
            return acc;
          }, {});
          

          setReviewsGrouped(grouped);

          // Initialize showMore state
          const initialShowMore = {};
          Object.keys(grouped).forEach((spEmail) => {
            initialShowMore[spEmail] = false; // Default to showing limited reviews
          });
          setShowMore(initialShowMore);
        } else {
          console.warn("No ratings found in the response data.");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviewsforSP();
  }, [serviceName]);


  return (
    <div className="mt-4">
    <hr></hr>
      
      <h1 className="font-bold text-4xl mt-3 mb-3 text-center">Rating and Reviews</h1>
      {/* Average Rating and Total Reviews */}
      <div className="text-center mb-2">
        <h2 className="text-5xl font-bold">{averageRating.toFixed(1)}</h2>
        <div className="flex justify-center items-center mb-1">
          {[...Array(5)].map((_, index) => (
            <AiFillStar
              key={index}
              className={index < Math.round(averageRating)
                ? "text-yellow-500"
                : "text-gray-300"}
            />
          ))}
        </div>
        <p className="text-gray-600">based on {totalReviews} reviews</p>
      </div>

      {/* Rating Distribution */}
      <div className=" flex-col justify-between mb-5">
        {Object.entries(ratingDistribution)
          .sort(([a], [b]) => b - a)
          .map(([stars, count]) => (
            <div key={stars} className="flex items-center my-2">
              <span className="flex items-center w-36 text-gray-800">
                <AiFillStar
                  className={ 
                    stars === '5'
                      ? "text-green-800"
                      : stars === '4'
                      ? "text-green-500"
                      : stars === '3'
                      ? "text-yellow-500"
                      : stars === '2'
                      ? "text-orange-500"
                      : "text-red-500"
                  }
                /> {/* Adjusted icon color */}
                <span className="ml-2 text-base font-medium">{ratingLabels[stars]}</span>
              </span>

              <div className="w-3/5 h-3 mx-4 bg-gray-200 rounded-full">
                <div
                  className={`h-3 rounded-full ${
                    stars === '5'
                      ? "bg-green-800"
                      : stars === '4'
                      ? "bg-green-500"
                      : stars === '3'
                      ? "bg-yellow-500"
                      : stars === '2'
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${(count / totalReviews) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
      </div>


      {Object.entries(reviewsGrouped)
  .slice(0, showAllSPs ? Object.entries(reviewsGrouped).length : 2)
  .map(([spEmail, { avgRating, reviews, spName }]) => (
    <div key={spEmail} className="mb-6">
      <div className="flex items-start mb-3">
        {/* Circle with SP's first initial */}
        <div className="flex items-center justify-center w-14 h-14 bg-yellow-500 rounded-full text-2xl font-bold text-black mr-4">
        {spName.split(" ")[0][0]?.toUpperCase() || "S"}  {/* Display the first initial */}
        </div>
        <div className="flex flex-col">
          {/* SP Name */}
          <h2 className="text-lg font-extrabold">{spName}</h2>
          {/* Average Rating */}
          <h3 className="text-2xl font-bold mt-2">{avgRating.toFixed(1)}</h3>
          <div className="flex justify-start items-center mt-1">
            {[...Array(5)].map((_, index) => (
              <AiFillStar
                key={index}
                className={
                  index < Math.round(avgRating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
      </div>
      <ul className="list-none m-0 p-0">
        {/* Show only the first two reviews if not expanded */}
        {(showMore[spEmail] ? reviews : reviews.slice(0, 1)).map((review, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-start space-x-4 p-4 border-b border-gray-200">
              {/* Circle with User's first initial */}
              <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full text-xl font-bold text-black">
                {review.User_Name.split(" ")[0][0]?.toUpperCase() || "U"}  {/* Display the first initial */}
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold">{review.User_Name}</h4>
                <div className="text-base font-semibold">{review.Service_Category}</div>

                <div className="flex items-center mt-2">
                 
                  <span className="ml-1 text-green-700 font-medium">
                    {review.Rating}
                  </span>
                  <AiFillStar className="text-yellow-500" />
                  
                </div>
                <p className="text-sm mt-2">{review.Review}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* Show the "See more reviews" button only if there are more than two reviews */}
      {reviews.length > 1 && (
        <div className="text-center mt-4">
          <button
            onClick={() =>
              setShowMore((prev) => ({
                ...prev,
                [spEmail]: !prev[spEmail],
              }))
            }
            className="text-blue-500 hover:text-blue-700 text-base"
          >
            {showMore[spEmail] ? `See less for ${spName}` : `See more for ${spName}`}
          </button>
        </div>
      )}
    </div>
  ))}

{/* Show more service providers button */}
{!showAllSPs && Object.entries(reviewsGrouped).length > 2 && (
  <div className="text-center mt-4">
    <button
      onClick={() => setShowAllSPs(true)}
      className="text-blue-500 hover:text-blue-700 font-medium"
    >
      See more..
    </button>
  </div>
)}

{showAllSPs && (
  <div className="text-center mt-4">
    <button
      onClick={() => setShowAllSPs(false)}
      className="text-blue-500 hover:text-blue-700 font-medium"
    >
      See less..
    </button>
  </div>
)}


    </div>
  );
};

export default Reviews;




