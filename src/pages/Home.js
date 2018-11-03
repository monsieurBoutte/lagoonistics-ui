import React, { useState, useEffect } from 'react';
import { fetchSaintJohnSensors } from '../services/saintJohn-service';
import axios from 'axios';
import LagoonMap from '../components/LagoonMap';

export const Home = () => {
  const [saintJohnSensorInfo, setSaintJohnSensorInfo] = useState([]);

  useEffect(() => {
    setSaintJohnSensorInfo(fetchSaintJohnSensors());
  }, [])

  return (
    <div>
      home screen
      <LagoonMap />
    </div>
  );
}
