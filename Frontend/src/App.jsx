
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Services from './Components/Services';
import Appliance from './Components/Appliances';
import Footer from "./Components/Footer";
import AboutUs from './Components/AboutUs';

import Option from "./Components/Option"
import VideoCarousel from "./Components/VideoCarousel"
import BecomeSP from "./Pages/BecameSP"
import Home from "./Pages/Home"
import Beauty from './Components/Beauty';
import BecomeServiceProviderForm from './Pages/BecameSP';
import HouseCleaning from './Components/HouseCleaning';
import Orders from './Pages/Orders';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './Pages/Profile';
import Login from './Components/Login';
import Payment from './Components/Payment';
import Plumbing from './Components/Plumbing';
import Carpentry from './Components/Carpentry';
import Gardening from './Components/Gardening';
import Painting from './Components/Painting';
import PestControl from './Components/PestControl';
import NetworkServices from './Components/NetworkServices';
import Electrical from './Components/Electrical';
import { AdminProvider } from './context/AdminContext';
import UserLayout from './Layout/UserLayout';
import AdminLayout from './Layout/AdminLayout';
import Admin from './Pages/Admin/Admin';
import Sidebar from './Pages/Admin/Sidebar';
import ManageUser from './Pages/Admin/ManageUser';
import ManageTeam from './Pages/Admin/ManageTeam';
import InvoiceBalance from './Pages/Admin/InvoiceBalance';
import ViewSp from './Pages/Admin/ViewSp';
import ViewUser from './Pages/Admin/ViewUser';
import ManageService from './Pages/Admin/ManageService';
import Rating from './Pages/Admin/Rating';
import ManageSalary from './Pages/Admin/ManageSalary';
import Report from './Pages/Admin/Report';
import FAQ from './Pages/Admin/FAQ';
import Calendar from './Pages/Admin/Calendar';
import ViewAdmin from './Pages/Admin/ViewAdmin';






function App() {


  return (



    <Router>
      <AuthProvider>
      <AdminProvider>
      {/* <Navigation />  */}
      <Routes>

        


      <Route path="/" element={<UserLayout />}>
      <Route index element={<Home />} />
        <Route path="/appliance" element={<Appliance />} /> 
        <Route path="/beauty" element={<Beauty/>} /> 
        <Route path="/housecleaning" element={<HouseCleaning/>} /> 
        <Route path="/plumbing" element={<Plumbing/>} /> 
        <Route path="/carpentry" element={<Carpentry/>} /> 
        <Route path="/gardening" element={<Gardening/>} /> 
        <Route path="/painting" element={<Painting/>} /> 
        <Route path="/pestcontrol" element={<PestControl/>} /> 
        <Route path="/network" element={<NetworkServices/>} /> 
        <Route path="/electrical" element={<Electrical/>} /> 
        <Route path="/services" element={<Services/>} /> 
        <Route path="/orders" element={<Orders/>} /> 
        <Route path="/becomeSP" element={<BecomeServiceProviderForm/>} /> 
        <Route path="/option" element={<Option/>}/>
        <Route path="/profile" element={<ProfilePage/>} /> 
        <Route path="/login" element={<Login/>} /> 
        <Route path="/payment" element={<Payment/>} /> 
        <Route path="/aboutUs" element={<AboutUs/>} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Admin />}/>
          <Route path="/admin/manageuser" element={<ManageUser/>}/>
          <Route path="/admin/manageteam" element={<ManageTeam/>}/>
          <Route path="/admin/invoices" element={<InvoiceBalance/>}/>
          <Route path="/admin/services" element={<ManageService/>}/>
          <Route path="/admin/rating" element={<Rating/>}/>
          <Route path="/admin/salary" element={<ManageSalary/>}/>
          <Route path="/admin/report" element={<Report/>}/>
          <Route path="/admin/faq" element={<FAQ/>}/>
          <Route path="/admin/calendar" element={<Calendar/>}/>
        
        

          <Route path="/admin/viewSp/:email" element={<ViewSp />} />
<Route path="/admin/viewUser/:email" element={<ViewUser />} />
<Route path="/admin/viewAdmin/:email" element={<ViewAdmin />} />

        </Route>
        
        {/* <Route path="/profile" element={<ProfilePage/>} />  */}
      </Routes>
      {/* <Footer /> */}
      
      </AdminProvider>
      </AuthProvider> 
    </Router>
  );
}

export default App;
