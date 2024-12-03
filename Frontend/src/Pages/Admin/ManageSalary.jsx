import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const ManageSalary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await axios.get('http://localhost:4002/get-sp-salary');
        const dataWithIds = response.data.data.map((item, index) => ({
          id: index + 1, // Assign a unique index starting from 1
          ...item,
        }));
        setSalaryData(dataWithIds);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching salary data:', error);
        setLoading(false);
      }
    };
    fetchSalaryData();
  }, []);

  // Unique values for the filters
  const months = [...new Set(salaryData.map((data) => data.month))];
  const years = [...new Set(salaryData.map((data) => data.year))];

  // Filtered data based on the selected filters
  const filteredData = salaryData.filter((data) => {
    return (
      (selectedMonth === '' || data.month === selectedMonth) &&
      (selectedYear === '' || data.year === selectedYear)
    );
  });

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'Index', width: 80 },
    { field: 'SP_Email', headerName: 'SP Email', width: 180 },
    { field: 'AccountNo', headerName: 'Account Number', width: 150 },
    { field: 'IFSCcode', headerName: 'IFSC Code', width: 130 },
    { field: 'Bank_Name', headerName: 'Bank Name', width: 150 },
    { field: 'Branch_Name', headerName: 'Branch Name', width: 150 },
    { field: 'CityName', headerName: 'City Name', width: 150 },
    { field: 'State', headerName: 'State', width: 150 },
    { field: 'month', headerName: 'Month', width: 120 },
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'Salary', headerName: 'Salary', type: 'number', width: 120 },
    { field: 'amount_to_pay', headerName: 'Amount to Pay', type: 'number', width: 150 },
    
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        const { Salary, amount_to_pay } = params.row;
        return Salary > amount_to_pay ? (
          <Button variant="contained" color="success">
            Pay Salary
          </Button>
        ) : (
          <Typography color="textSecondary"></Typography>
        );
      },
    },
  ];

  return (
    <Box p={3}>
      
      <Typography variant="h4" gutterBottom>
        Manage Salary
      </Typography>

      {/* Filter Options */}
      <Box display="flex" gap={2} mb={2} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Month"
          >
            <MenuItem value="">All</MenuItem>
            {months.map((month) => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
          >
            <MenuItem value="">All</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* DataGrid for Salary Management */}
      <div style={{ height: 400, width: '100%' }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          getRowId={(row) => row.id}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#3f51b5',
      color: 'black', // Adjust color if needed
      fontWeight: 'bold',
      fontSize: '16px', // Increase size for readability
    },
              '& .MuiDataGrid-cell:hover': {
                backgroundColor: '#e3f2fd',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#e0e0e0',
              },
            }}
          />
        )}
      </div>
    </Box>
  );
};

export default ManageSalary;
