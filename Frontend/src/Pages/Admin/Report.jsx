import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthAdmin } from '../../context/AdminContext';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedReportStatus, setSelectedReportStatus] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const { currentAdmin } = useAuthAdmin();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:4002/reports-by-admin');
        const data = response.data.data.map((report, index) => ({
          id: index + 1,
          reportId: report.Report_ID,
          userEmail: report.U_Email,
          spEmail: report.SP_Email,
          billId: report.Bill_ID,
          reportDate: new Date(report.Report_Date).toLocaleDateString(), // Format date as needed
          reportDescription: report.Report_Description,
          reportType: report.Report_Type,
          reportStatus: report.Report_Status,
        }));
        setReportData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [reload]);

  useEffect(() => {
    const filtered = reportData.filter((data) => {
      return (
        (selectedReportType === '' || data.reportType === selectedReportType) &&
        (selectedReportStatus === '' || data.reportStatus === selectedReportStatus)
      );
    });
    setFilteredData(filtered);
  }, [selectedReportType, selectedReportStatus, reportData]);

  const handleResolve = async (id) => {
    try {
      const adminEmail = currentAdmin.A_Email;
      const report = filteredData.find((report) => report.reportId === id);
      if (!report) {
        console.error('Report not found');
        return;
      }
      const userEmail = report.spEmail;

      const response = await axios.put(
        `http://localhost:4002/update-report-user/${report.reportId}/${adminEmail}/${userEmail}`
      );

      if (response.status === 200) {
        toast.success('Report resolved successfully', {
          position: 'top-right',
          autoClose: 3000,
        });

        setFilteredData((prevData) => 
          prevData.map((reportItem) =>
            reportItem.id === id
              ? { ...reportItem, reportStatus: 'Resolved' }
              : reportItem
          )
        );
        setReload(!reload);
      }
    } catch (error) {
      console.error('Error updating report status:', error);
      toast.error('Failed to resolve report', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (reportId) => {
    try {
      const adminEmail = currentAdmin.A_Email;

      const response = await axios.put(`http://localhost:4002/update-report-to-rejected/${reportId}`, { adminEmail });

      if (response.status === 200) {
        toast.success('Report marked as rejected successfully', {
          position: 'top-right',
          autoClose: 3000,
        });

        setFilteredData((prevData) => 
          prevData.map((report) =>
            report.reportId === reportId
              ? { ...report, reportStatus: 'Rejected' }
              : report
          )
        );
        setReload(!reload);
      }
    } catch (error) {
      console.error('Error updating report status:', error);
      toast.error('Failed to update report status', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleView = (reportId) => {
    const report = filteredData.find((report) => report.reportId === reportId);
    if (report) {
      setSelectedReport(report);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  const columns = [
    { field: 'reportId', headerName: 'Report ID', width: 150 },
    { field: 'userEmail', headerName: 'User Email', width: 200 },
    { field: 'spEmail', headerName: 'SP Email', width: 200 },
    { field: 'billId', headerName: 'Bill ID', width: 150 },
    { field: 'reportDate', headerName: 'Report Date', width: 150 },
    { field: 'reportDescription', headerName: 'Description', width: 300 },
    { field: 'reportType', headerName: 'Report Type', width: 150 },
    { field: 'reportStatus', headerName: 'Report Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        if (params.row.reportStatus === 'Pending') {
          return (
            <Box>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleResolve(params.row.reportId)}
                style={{ marginRight: '10px' }}
              >
                Resolve
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(params.row.reportId)}
              >
                Reject
              </Button>
            </Box>
          );
        } else {
          return (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleView(params.row.reportId)}
            >
              View
            </Button>
          );
        }
      },
    },
  ];

  return (
    <Box p={3}>
    
      <Typography variant="h4" gutterBottom>
        Report Management
      </Typography>

      {/* Filter Options */}
      <Box display="flex" gap={2} mb={2} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Report Type</InputLabel>
          <Select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            label="Report Type"
          >
            <MenuItem value="">All</MenuItem>
            {Array.from(new Set(reportData.map((data) => data.reportType))).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Report Status</InputLabel>
          <Select
            value={selectedReportStatus}
            onChange={(e) => setSelectedReportStatus(e.target.value)}
            label="Report Status"
          >
            <MenuItem value="">All</MenuItem>
            {Array.from(new Set(reportData.map((data) => data.reportStatus))).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* DataGrid for Report Management */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          getRowId={(row) => row.id}
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

      {/* Dialog for Viewing Report Details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Report Details</DialogTitle>
        <DialogContent>
          {selectedReport ? (
            <Box>
              <Typography variant="h6">Report ID: {selectedReport.reportId}</Typography>
              <Typography variant="subtitle1" color="textSecondary">User Email: {selectedReport.userEmail}</Typography>
              <Typography variant="subtitle1" color="textSecondary">SP Email: {selectedReport.spEmail}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Bill ID: {selectedReport.billId}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Date: {selectedReport.reportDate}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Description: {selectedReport.reportDescription}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Type: {selectedReport.reportType}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Status: {selectedReport.reportStatus}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="subtitle1" color="textSecondary">Resolved By: {currentAdmin?.A_Email || 'N/A'}</Typography>
            </Box>
          ) : (
            <Typography>No report selected</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default Report;
