import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { Star } from '@mui/icons-material';

const Rating = () => {
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState('All'); 

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4002/api/ratings');
        const data = await response.json();
        // console.log("data",data.data);
        
        setReviewData(data.data);
        // console.log("Review Data",reviewData);
         // Assuming the data is in `data.data`
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const reviewCount = reviewData.length;
  const starRatings = [5, 4, 3, 2, 1];
  const starCounts = starRatings.map((star) =>
    reviewData.filter((review) => review.Rating === star).length
  );

  const averageRating = (
    reviewData.reduce((sum, review) => sum + review.Rating, 0) / reviewCount
  ).toFixed(1);
  // console.log("average ",averageRating);

  const filteredData =
    selectedRating === 'All'
      ? reviewData
      : reviewData.filter((review) => review.Rating === parseInt(selectedRating));

  const reviewAnalyticsData = {
    labels: starRatings.map((star) => `${star} Star`),
    datasets: [
      {
        label: 'Number of Reviews',
        data: starCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const services = Array.from(new Set(reviewData.map((review) => review.Service_Name)));
  const serviceCounts = services.map(
    (service) =>
      reviewData.filter((review) => review.Service_Name === service).length
  );
  const columns = [
    { field: 'Rate_ID', headerName: 'Rate ID', width: 150 },
    { field: 'Rate_Date', headerName: 'Rate Date', width: 180 },
    { field: 'U_Email', headerName: 'Customer Email', width: 180 },
    { field: 'Service_Name', headerName: 'Service Name', width: 180 },
    { field: 'Service_Category', headerName: 'Service Category', width: 180 },
    { field: 'SP_Email', headerName: 'SP Email', width: 180 },
    { field: 'Rating', headerName: 'Rating', width: 100 },
    { field: 'Review', headerName: 'Review', width: 300 },
  ];
  
  const servicesChartData = {
    labels: services,
    datasets: [
      {
        label: 'Number of Reviews by Service',
        data: serviceCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    
    <Box p={3}>
      
      <Typography variant="h4" gutterBottom>
        Customer Reviews
      </Typography>
      <div className="flex flex-row">
        {/* review analytics  */}
        <div className="w-1/2 flex flex-row bg-yellow-500 text-black p-6 rounded-lg shadow-lg">
          <div>
            <Typography variant="h6" gutterBottom>
              <span className="font-extrabold text-6xl text-green-800">
                {averageRating}
                <Star style={{ color: 'green', fontSize: '3rem' }} />
              </span>
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Total Reviews</strong>
              <div>{reviewCount}</div>
            </Typography>
          </div>
          <div className="ml-14 w-1/2">
            <div style={{ width: '100%', marginTop: '10px' }}>
              <Bar
                data={reviewAnalyticsData}
                options={{
                  responsive: true,
                  indexAxis: 'y',
                  scales: {
                    x: { grid: { display: false }, ticks: { display: false } },
                    y: { grid: { display: false }, ticks: { display: true } },
                  },
                  plugins: { legend: { display: false }, tooltip: { enabled: true } },
                }}
                height={200}
              />
            </div>
          </div>
        </div>
        

        {/* review statistics  */}

        <div className="mx-5 w-1/2 items-end">
          <Typography variant="h5" gutterBottom>
            Review Statistics
          </Typography>
          <div style={{ width: '100%' }}>
            <Bar
              data={servicesChartData}
              options={{
                responsive: true,
                scales: {
                  x: { grid: { display: false }, ticks: { display: false } },
                  y: { grid: { display: false }, ticks: { display: false } },
                },
                plugins: { legend: { display: false }, tooltip: { enabled: true } },
              }}
              height={100}
            />
          </div>
        </div>
      </div>
      {/* Filter Dropdown */}
      
      <Box display="flex" gap={2} mt={2} mb={2} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
      <FormControl style={{  width: '200px' }}>
        <InputLabel id="rating-filter-label" style={{fontSize:'25px'}}>Filter by Rating</InputLabel>
        <Select
          labelId="rating-filter-label"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          style={{marginTop:'20px'}}
        >
          <MenuItem value="All">All</MenuItem>
          {starRatings.map((rating) => (
            <MenuItem key={rating} value={rating}>
              {rating} Star
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>

      {/* Display DataGrid */}
      
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData.map((review, index) => ({ ...review, id: index }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#3f51b5',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '16px',
            },
            '& .MuiDataGrid-cell:hover': {
              backgroundColor: '#e3f2fd',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#e0e0e0',
            },
          }}
        />
      </div>
      
    </Box>
    
  );
};

export default Rating;
