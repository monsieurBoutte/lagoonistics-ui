import React, { useState, useEffect } from 'react';
import { fetchSaintJohnSensors } from '../services/saintJohn-service';
import * as SensorContext from './SensorContext';

const useFilteredStJohnSensorList = (originalStJohnSensorList, ...params) => {
  const [filteredStJohnSensorList, setFilteredStJohnSensorList] = useState([]);

  const pluckFromStJohnSensorList = (originalStJohnSensorList, ...params) => {
    return setFilteredStJohnSensorList(
      originalStJohnSensorList
        .filter(
          sensor =>
            params[0].includes(
              sensor.metaData.attributes.PARAM
            )
        )
    )
  };

  return {
    filteredStJohnSensorList,
    setFilteredStJohnSensorList,
    pluckFromStJohnSensorList
  };
};

export const SensorProvider = props => {
  const [saintJohnSensorInfo, setSaintJohnSensorInfo] = useState([]);
  const [saintJohnDataVisibility, setSaintJohnDataVisibility] = useState(true);
  const [kilroyDataVisibility, setKilroyDataVisibility] = useState(true);
  const [loboDataVisibility, setLoboDataVisibility] = useState(true);
  const {
    filteredStJohnSensorList,
    setFilteredStJohnSensorList,
    pluckFromStJohnSensorList
  } = useFilteredStJohnSensorList();

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
        refreshSaintJohn: handleSaintJohnRefresh,
        filteredStJohnSensorList,
        setFilteredStJohnSensorList,
        pluckFromStJohnSensorList,
        saintJohnDataVisibility,
        toggleSaintJohnDataVisibility: setSaintJohnDataVisibility,
        kilroyDataVisibility,
        toggleKilroyDataVisibility: setKilroyDataVisibility,
        loboDataVisibility,
        toggleLoboDataVisibility: setLoboDataVisibility
      }}
    >
      {props.children}
    </SensorContext.Provider>
  )
};
