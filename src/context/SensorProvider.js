import React, { useState, useEffect } from 'react';
import { fetchSaintJohnSensors } from '../services/saintJohn-service';
import * as SensorContext from './SensorContext';


export const SensorProvider = props => {
  const [saintJohnSensorInfo, setSaintJohnSensorInfo] = useState([]);

  useEffect(() => {
    try {
      fetchSaintJohnSensors().then(results => setSaintJohnSensorInfo(results))
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSaintJohnRefresh = () => setSaintJohnSensorInfo(fetchSaintJohnSensors());

  return (
    <SensorContext.Provider
      value={{
        saintJohnSensors: saintJohnSensorInfo,
        refreshSaintJohn: handleSaintJohnRefresh
      }}
    >
      {props.children}
    </SensorContext.Provider>
  )
};
