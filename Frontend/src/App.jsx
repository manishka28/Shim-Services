
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Services from './Components/Services';
import Appliance from './Components/Appliances';
import Footer from "./Components/Footer"


import VideoCarousel from "./Components/VideoCarousel"
import Home from "./Pages/Home"
import Beauty from './Components/Beauty';


function App() {
  return (

    <Router>
      <Navigation /> 
      <Routes>

        <Route path="/" element={<Home/>} /> 
        <Route path="/appliance" element={<Appliance />} /> 
        <Route path="/beauty" element={<Beauty/>} /> 
      </Routes>
      <Footer /> 
    </Router>
  );

}

export default App;
