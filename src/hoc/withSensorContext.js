import React, { useState } from 'react';
import { SensorContext } from '../context/SensorContext';

export default withSensorContext = BaseComponet => props => {
  const [saintJohnSensorInfo, setSaintJohnSensorInfo] = useState([]);

  useEffect(() => {
    setSaintJohnSensorInfo(fetchSaintJohnSensors());
  }, []);

  const handleSaintJohnRefresh = () => setSaintJohnSensorInfo(fetchSaintJohnSensors());

  return (
    <SensorContext.Provider
      value={{
        saintJohnSensorInfo,
        refreshSaintJohn: handleSaintJohnRefresh
      }}
    >
      {this.props.children}
    </SensorContext.Provider>
  )
};