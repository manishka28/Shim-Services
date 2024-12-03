import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for the toast notifications
import { useAuthAdmin } from '../../context/AdminContext';

function ManageService() {
  const [servicesData, setServicesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: '',
    serviceCategory: '',
    initialPrice: '',
  });
  const [reload, setReload] = useState(false); 

  const {currentAdmin} = useAuthAdmin();
  console.log("current",currentAdmin.A_Email);
  

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:4002/admin/services');
        const data = response.data.services.map((service, index) => ({
          id: index + 1,
          serviceName: service.Service_Name,
          serviceCategory: service.Service_Category,
          initialPrice: service.Initial_Price,
        }));
        setServicesData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [reload]);

  useEffect(() => {
    let filtered = servicesData;
    if (selectedServiceName) {
      filtered = filtered.filter((service) => service.serviceName === selectedServiceName);
    }

    if (selectedCategory) {
      filtered = filtered.filter((service) => service.serviceCategory === selectedCategory);
    }

    setFilteredData(filtered);
  }, [selectedServiceName, selectedCategory, servicesData]);

  const handleAddService = async () => {
    try {
      const response = await axios.post('http://localhost:4002/add-service-by-admin', {
        adminEmail: currentAdmin.A_Email,
        serviceName: newService.serviceName,
        serviceCategory: newService.serviceCategory,
        initialPrice: parseFloat(newService.initialPrice),
      });

      if (response.status === 200) {
        toast.success('Service added successfully!');
        const newId = Math.max(...servicesData.map((s) => s.id)) + 1;
        const service = {
          id: newId,
          serviceName: newService.serviceName,
          serviceCategory: newService.serviceCategory,
          initialPrice: parseFloat(newService.initialPrice),
        };
        setFilteredData((prev) => [...prev, service]);
        setIsDialogOpen(false);
        setNewService({ serviceName: '', serviceCategory: '', initialPrice: '' });
        setReload(!reload);
      }
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service. Please try again.');
    }
  };
  const handleDelete = async (serviceId) => {
    // Find the service to delete based on its ID
    const serviceToDelete = servicesData.find((service) => service.id === serviceId);
  
    if (!serviceToDelete) {
      toast.error('Service not found.');
      return;
    }
  
    try {
      // Send a DELETE request to the backend
      const response = await axios.delete('http://localhost:4002/delete-service', {
        data: {
          serviceName: serviceToDelete.serviceName,
          serviceCategory: serviceToDelete.serviceCategory,
        },
      });
  
      // If the response is successful, update the UI and show a success toast
      if (response.status === 200) {
        toast.success(`Service "${serviceToDelete.serviceName}" deleted successfully!`);
        setFilteredData((prev) => prev.filter((service) => service.id !== serviceId));
        setReload(!reload);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service. Please try again.');
    }
  };
  

  const columns = [
    { field: 'serviceName', headerName: 'Service Name', width: 200 },
    { field: 'serviceCategory', headerName: 'Service Category', width: 200 },
    {
      field: 'initialPrice',
      headerName: 'Initial Price',
      width: 150,
      valueFormatter: (params) => {
        if (!params || params === null || params === undefined) {
          return '₹0.00';
        }
        return `₹${params}`;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row.id)}
            title="Edit Service"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
            title="Delete Service"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    }
    
  ];

  return (
    <div style={{ width: '100%' }}>
      
      <Typography variant="h4" gutterBottom>
        Manage Services
      </Typography>
      <Box p={2} sx={{ border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <FormControl style={{ minWidth: 200 }}>
              <InputLabel id="filter-service-name">Service Name</InputLabel>
              <Select
                labelId="filter-service-name"
                value={selectedServiceName}
                onChange={(e) => setSelectedServiceName(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {Array.from(new Set(servicesData.map((service) => service.serviceName))).map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ minWidth: 200 }}>
              <InputLabel id="filter-service-category">Service Category</InputLabel>
              <Select
                labelId="filter-service-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {Array.from(new Set(servicesData.map((service) => service.serviceCategory))).map(
                  (category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </div>

          <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => setIsDialogOpen(true)}>
            Add Service
          </Button>
        </div>
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '8px' }}
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

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogContent>
          <TextField
            label="Service Name"
            fullWidth
            margin="dense"
            value={newService.serviceName}
            onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
          />
          <TextField
            label="Service Category"
            fullWidth
            margin="dense"
            value={newService.serviceCategory}
            onChange={(e) => setNewService({ ...newService, serviceCategory: e.target.value })}
          />
          <TextField
            label="Initial Cost"
            type="number"
            fullWidth
            margin="dense"
            value={newService.initialPrice}
            onChange={(e) => setNewService({ ...newService, initialPrice: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddService} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
}

export default ManageService;
