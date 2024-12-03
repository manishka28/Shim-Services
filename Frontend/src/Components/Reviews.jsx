import { AiFillStar } from "react-icons/ai";  
import React, { useState, useEffect } from "react";
import axios from "axios";

export const Reviews = ({ serviceName }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [averageRating, setAverageRating] = useState(0);
  const [showMore, setShowMore] = useState(false); // state to control showing more reviews

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

  return (
    <>
      
      <h1 className="font-bold text-4xl mt-3 mb-5 text-center">Rating and Reviews</h1>
      {/* Average Rating and Total Reviews */}
      <div className="text-center mb-6">
        <h2 className="text-6xl font-bold">{averageRating.toFixed(1)}</h2>
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
      <div className="mt-4 flex-col justify-between mb-8">
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

      {/* Individual Reviews */}
      <ul className="list-none m-0 p-0">
        {reviewsToDisplay.map((review, index) => (
          <li key={index} className="mb-6">
            <div className="flex items-start space-x-4 p-4 border-b border-gray-200">
              {/* Customer Initial Circle */}
              <div className="flex items-center justify-center w-14 h-14 bg-yellow-500 rounded-full text-2xl font-bold text-black">
                {/* {review.U_Name.charAt(0).toUpperCase()} */}
                {review.U_Name.split(" ").map((word) => word[0]).join("") || "U"}
              </div>

              {/* Review Information */}
              <div className="flex-grow">
                <h4 className="text-lg font-medium">{review.U_Name}</h4>
                <h3 className="text-gray-600">{review.Service_Category}</h3>
                <div className="flex items-center mt-2">
                  <AiFillStar className="text-yellow-500" />
                  <span className="ml-1 text-green-700 font-medium">{review.Rating}</span>
                </div>
                <p className="text-sm mt-2">{review.Review}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Show more button */}
      {totalReviews > 4 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            {showMore ? "See less" : "See more reviews"}
          </button>
        </div>
      )}
    </>
  );
};

export default Reviews;
