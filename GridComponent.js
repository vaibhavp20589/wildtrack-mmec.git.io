import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GridComponent = () => {
  const [setAnimals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/locations'); // Assuming your backend endpoint
      setAnimals(response.data.animals); // Update animals state with group data
    };
    fetchData();
  }, [setAnimals]);

  // Sample animal data with location history
  const sampleAnimals = [
    {
      animalId: 1,
      name: 'Lion',
      locationHistory: [
        { latitude: 37.7749, longitude: -122.4194 }, // Near reference point
        { latitude: 37.785, longitude: -122.405 }, // Near reference point
        { latitude: 37.802, longitude: -122.38 }, // Far from reference point
      ],
    },
    {
      animalId: 2,
      name: 'Zebra',
      locationHistory: [
        { latitude: 37.79, longitude: -122.41 }, // Near reference point
        { latitude: 37.797, longitude: -122.402 }, // Near reference point
        { latitude: 37.815, longitude: -122.37 }, // Far from reference point
      ],
    },
  ];

  const gridSize = 20; // Size of the grid

  const getGridStyle = (latitude, longitude, group) => { // Include group parameter
    switch (group) {
      case "Group A (Near Reference Point)":
        return {
          position: 'absolute',
          top: `${latitude * gridSize}px`,
          left: `${longitude * gridSize}px`,
          width: `${gridSize}px`,
          height: `${gridSize}px`,
          backgroundColor: 'blue',
          borderRadius: '50%'
        };
      case "Group B (Far from Reference Point)":
        return {
          position: 'absolute',
          top: `${latitude * gridSize}px`,
          left: `${longitude * gridSize}px`,
          width: `${gridSize}px`,
          height: `${gridSize}px`,
          backgroundColor: 'red',
          borderRadius: '50%'
        };
      default:
        return {
          position: 'absolute',
          top: `${latitude * gridSize}px`,
          left: `${longitude * gridSize}px`,
          width: `${gridSize}px`,
          height: `${gridSize}px`,
          backgroundColor: 'gray',
          borderRadius: '50%'
        };
    }
  };

  return (
    <div style={{ position: 'relative', width: '400px', height: '400px', border: '1px solid black' }}>
      {/* Use sampleAnimals for development or testing */}
      {sampleAnimals.map((animal) => (
        animal.locationHistory.map((loc, index) => (
          <div
            key={index}
            style={getGridStyle(loc.latitude, loc.longitude, /* Call your grouping function here */)} // Replace with your grouping logic
          />
        ))
      ))}
      {/* Replace with actual animal data from backend when ready */}
      {/* {animals.map((animal) => (
        animal.locationHistory.map((loc, index) => (
          <div
            key={index}
            style={getGridStyle(loc.latitude, loc.longitude, animal.group)} // Access group from animal object
          />
        ))
      ))} */}
    </div>
  );
};

export default GridComponent;
