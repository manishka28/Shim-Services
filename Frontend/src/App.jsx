
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Services from './Components/Services';
import Appliance from './Components/Appliances';
import Footer from "./Components/Footer"

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




function App() {


  return (

    <Router>
      <AuthProvider>
      <Navigation /> 
      <Routes>

        <Route path="/" element={<Home/>} /> 
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
        {/* <Route path="/profile" element={<ProfilePage/>} />  */}
      </Routes>
      <Footer />
      </AuthProvider> 
    </Router>
  );
}

export default App;
