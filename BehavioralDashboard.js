import React, { useState, useEffect } from 'react';
import axios from 'axios';
import myImage from '../dash.png'; 
const BehavioralDashboard = () => {
  const [data, setData] = useState({
    totalAnimals: 0,
    totalGroups: 0,
    groupDetails: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/locations/behavioral-data');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching behavioral data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Animals: {data.totalAnimals}</p>
      <p>Total Groups: {data.totalGroups}</p>
      <h2>Group Details</h2>
      <ul>
        {data.groupDetails.map((group, index) => (
          <li key={index}>
            Group {index + 1}: {group.animals.join(', ')}
          </li>
        ))}
      </ul>
      <img src={myImage} alt="dash" />
    </div>
  );
};

export default BehavioralDashboard;
