// AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Admin/Navbar';
import Sidebar from '../Pages/Admin/Sidebar';


const AdminLayout = ({ children }) => {
    return (
      <>
      <div className='flex flex-row'>
      <div className='w-1/12 z-2'>
      <Sidebar/>
      
      </div>
      <div className='w-11/12 flex flex-col z-1'>
        <Navbar/>
        <main>
        <Outlet />  {/* This renders the child routes */}
      </main>
      </div>


      </div>
      

      </>
    );
};

export default AdminLayout;
