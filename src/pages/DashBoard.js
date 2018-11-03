import React, { Fragment } from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';

export const DashBoard = props => (
  <div>
    <NavBar />
    <SideNav />
    {props.children}
  </div>
);
