import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
// import GridComponent from './components/GridComponent';
import BehavioralDashboard from './components/BehavioralDashboard';
import MapComponent from './components/MapComponent';
import 'leaflet/dist/leaflet.css';
import './styles.css'; 
import { createContext } from 'react'; 
import './App.css';
import AlertForm from './AlertForm';
export const ThemeContext = createContext();

const App = () => {
  
  const locations = [
    { name: 'Keoladeo', latitude: 27.159269, longitude: 77.5231999 },
    { name: 'Keoladeo', latitude: 27.2, longitude: 77.6 },{ name: 'Keoladeo', latitude: 28.159269, longitude: 76.5231999 },{ name: 'Keoladeo', latitude: 28.159269, longitude: 78.5231999 },{ name: 'Keoladeo', latitude: 27.859269, longitude: 77.9231999 },
    { name: 'Neora valley', latitude: 27.085251, longitude: 88.700928},
    {name: 'Neora valley', latitude: 28.085251, longitude: 88.700928}
  ];
  return (
    <div className="container">
      <Router>
        <div className="navbar">
          <div className="logo">WildTrack</div>
          <div className="nav-links">
          <a className="nav-c" href="/">Home</a>
          <a className="nav-c" href="/map">Map</a>
          {/* <a className="nav-c" href="/">Grouping</a> */}
          <a className="nav-c" href="/AlertForm">Alert Form</a>
          <a className="nav-c" href="/dashboard">Dashboard</a>
          
          </div>
        </div>   
        <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/grid" element={<GridComponent />} /> */}
        <Route path="/map" element={<MapComponent locations={locations} />} />
        <Route path="/AlertForm" element={<AlertForm />} />
        <Route path="/dashboard" element={<BehavioralDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
