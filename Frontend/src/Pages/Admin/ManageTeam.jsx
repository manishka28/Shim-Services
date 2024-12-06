import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PauseIcon from '@mui/icons-material/Pause';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Super Admin
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'; // Service Manager
import GroupIcon from '@mui/icons-material/Group'; // User Manager
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Billing & Payment Administrator
import axios from 'axios';

function ManageTeam() {
  const [usersData, setUsersData] = useState([]); // State to hold fetched data
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4002/api/admin');
        setUsersData(
          response.data.map((user, index) => ({
            id: index + 1, // Assign an auto-increment ID
            name: user.A_Name,
            email: user.A_Email,
            phone: user.A_Phone,
            role: user.A_Role,
            status: 'Active', // Default status, can be adjusted as needed
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleAction = (action) => {
    // console.log(`Action: ${action} on user with ID: ${selectedUserId}`);
    handleMenuClose();
  };
  const navigate = useNavigate();

  const handleViewClick = (params) => {
    // Access the email through params.row.email
    const email = params.row.email;
    navigate(`/admin/viewAdmin/${email}`); // Navigate to the viewAdmin page
  };
  

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'role',
      headerName: 'Role',
      width: 250,
      renderCell: (params) => (
        <div className="flex items-center">
          {params.value === 'Super Admin' && (
            <>
              <AdminPanelSettingsIcon style={{ color: 'purple', marginRight: 4 }} />
              <span>Super Admin</span>
            </>
          )}
          {params.value === 'Service Manager' && (
            <>
              <SupervisorAccountIcon style={{ color: 'blue', marginRight: 4 }} />
              <span>Service Manager</span>
            </>
          )}
          {params.value === 'User Manager' && (
            <>
              <GroupIcon style={{ color: 'orange', marginRight: 4 }} />
              <span>User Manager</span>
            </>
          )}
          {params.value === 'Billing & Payment Administrator' && (
            <>
              <AttachMoneyIcon style={{ color: 'green', marginRight: 4 }} />
              <span>Billing & Payment Administrator</span>
            </>
          )}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <div
          style={{
            color: params.value === 'Active' ? 'green' : 'gray',
            fontWeight: 'bold',
            padding: '5px 10px',
            textAlign: 'center',
            borderRadius: '5px',
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <div className="flex ">
          <IconButton style={{ color: 'blue' }}  onClick={() => handleViewClick(params)}>
            <VisibilityIcon />
          </IconButton>
          {/* <IconButton style={{ color: 'red' }} onClick={() => console.log(`Deleting user ${params.id}`)}>
            <DeleteIcon />
          </IconButton> */}
          {/* <IconButton onClick={(e) => handleMenuClick(e, params.id)}>
            <MoreVertIcon />
          </IconButton> */}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      
      <Typography variant="h4" gutterBottom>
        Manage Team
      </Typography>
      <DataGrid
        rows={usersData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem onClick={() => handleAction('Edit')}>
          <EditIcon /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleAction('Suspend')}>
          <PauseIcon /> Suspend
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ManageTeam;
