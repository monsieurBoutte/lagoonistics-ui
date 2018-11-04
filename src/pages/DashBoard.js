import React from 'react';
import NavBar from '../components/NavBar';
import RightSideNav from '../components/RightSideNav';
import { SensorProvider } from '../context/SensorProvider';


export const DashBoard = props => (
  <SensorProvider>
    <div>
      <NavBar />
      <RightSideNav />
      {props.children}
    </div>
  </SensorProvider>
);
