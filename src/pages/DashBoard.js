import React, { Fragment } from 'react';
import NavBar from '../components/NavBar';
import RightSideNav from '../components/RightSideNav';

export const DashBoard = props => (
  <div>
    <NavBar />
    <RightSideNav />
    {props.children}
  </div>
);
