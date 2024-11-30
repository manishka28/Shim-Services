import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  PeopleAltOutlined,
  ContactsOutlined,
  ReceiptOutlined,
  PersonOutlined,
  CalendarTodayOutlined,
  HelpOutlineOutlined,
  BarChartOutlined,
  DonutLargeOutlined,
  TimelineOutlined,
  MapOutlined,
  WavesOutlined,
  GroupWorkOutlined
} from '@mui/icons-material';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo.jpg'; // Update this path with your actual logo file
import fulllogo from '../../assets/BWlogo.jpg';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeLink, setActiveLink] = useState('/'); // Set '/' as the default active link (Dashboard)

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!collapsed) setCollapsed(true);
  };

  // Function to handle link click and set active state
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full ${collapsed ? 'w-16' : 'w-64'} bg-black text-white transition-width duration-300 overflow-y-scroll custom-scrollbar`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
        `}
      </style>

      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="items-center p-3 bg-black">
          {collapsed ? (
            <img src={logo} alt="Logo" className='h-12 w-20' />
          ) : (
            <img src={fulllogo} alt="Full Logo" className="h-16 w-36 ml-3" />
          )}
        </div>

        {/* User Info */}
        {/* {!collapsed && (
          <div className="flex flex-col items-center p-4">
            <h2 className="mt-2 text-xl font-semibold">Tony Stark</h2>
            <p className="text-green-400">Admin</p>
          </div>
        )} */}

        {/* Navigation Links */}
        <nav className="flex flex-col mt-4">
          {/* Dashboard */}
          <Link
            to="/"
            className={`flex items-center p-3 m-1  rounded ${
              activeLink === '/' ? 'bg-yellow-500' : 'hover:bg-gray-700 '
            }`}
            onClick={() => handleLinkClick('/')}
          >
            <DashboardOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Dashboard</span>}
          </Link>

          {/* Data Section */}
          {!collapsed && <h3 className="mt-4 text-gray-400 pl-4">Data</h3>}
          <Link
            to="/admin/manageuser"
            className={`flex items-center p-3 rounded ${
              activeLink === '/admin/manageuser' ? 'bg-yellow-400' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/admin/manageuser')}
          >
            <PeopleAltOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Manage User</span>}
          </Link>
          <Link
  to="/admin/manageteam"
  className={`flex items-center p-3 rounded ${
    activeLink === '/admin/manageteam' ? 'bg-yellow-400' : 'hover:bg-gray-700'
  }`}
  onClick={() => handleLinkClick('/admin/manageteam')}
>
  <GroupWorkOutlined className="h-6 w-6" /> {/* New icon */}
  {!collapsed && <span className="ml-3">Manage Team</span>}
</Link>

          <Link
            to="/contacts"
            className={`flex items-center p-3 rounded ${
              activeLink === '/contacts' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/contacts')}
          >
            <ContactsOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Contacts Information</span>}
          </Link>
          <Link
            to="/invoices"
            className={`flex items-center p-3 rounded ${
              activeLink === '/invoices' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/invoices')}
          >
            <ReceiptOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Invoices Balances</span>}
          </Link>

          {/* Pages Section */}
          {!collapsed && <h3 className="mt-4 text-gray-400 pl-4">Pages</h3>}
          <Link
            to="/form"
            className={`flex items-center p-3 rounded ${
              activeLink === '/form' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/form')}
          >
            <PersonOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Profile Form</span>}
          </Link>
          <Link
            to="/role"
            className={`flex items-center p-3 rounded ${
              activeLink === '/role' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/role')}
          >
            <PersonOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Manage Service</span>}
          </Link>
          <Link
            to="/calendar"
            className={`flex items-center p-3 rounded ${
              activeLink === '/calendar' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/calendar')}
          >
            <CalendarTodayOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Calendar</span>}
          </Link>
          <Link
            to="/faq"
            className={`flex items-center p-3 rounded ${
              activeLink === '/faq' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/faq')}
          >
            <HelpOutlineOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">FAQ Page</span>}
          </Link>

          {/* Charts Section */}
          {!collapsed && <h3 className="mt-4 text-gray-400 pl-4">Charts</h3>}
          <Link
            to="/bar"
            className={`flex items-center p-3 rounded ${
              activeLink === '/bar' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/bar')}
          >
            <BarChartOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Bar Chart</span>}
          </Link>
          <Link
            to="/pie"
            className={`flex items-center p-3 rounded ${
              activeLink === '/pie' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/pie')}
          >
            <DonutLargeOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Pie Chart</span>}
          </Link>
          <Link
            to="/line"
            className={`flex items-center p-3 rounded ${
              activeLink === '/line' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/line')}
          >
            <TimelineOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Line Chart</span>}
          </Link>
          <Link
            to="/geography"
            className={`flex items-center p-3 rounded ${
              activeLink === '/geography' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/geography')}
          >
            <MapOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Geography Chart</span>}
          </Link>
          <Link
            to="/stream"
            className={`flex items-center p-3 rounded ${
              activeLink === '/stream' ? 'bg-yellow-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleLinkClick('/stream')}
          >
            <WavesOutlined className="h-6 w-6" />
            {!collapsed && <span className="ml-3">Stream Chart</span>}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
