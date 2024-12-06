import React, { useEffect } from 'react';
import SideBar from './Sidebar';
import Landing from './Landing';
import Navbar from './Navbar';
import { useAuthAdmin } from '../../context/AdminContext';
import Login from '../../Components/Login';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const { currentAdmin } = useAuthAdmin();
  // console.log("admin in", currentAdmin);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentAdmin === null) {
      navigate("/"); // Navigate to the root path if currentAdmin is null
    }
  }, [currentAdmin, navigate]);

  return (
    <div className='flex flex-row'>
      <Landing />
    </div>
  );
}

export default Admin;
