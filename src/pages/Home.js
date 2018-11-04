import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LagoonMap from '../components/LagoonMap';
import { LeftSideBar } from '../components/LeftSideBar';
import { fetchSaintJohnSensors } from '../services/saintJohn-service';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#262D26',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'fixed',
    top: 90,
    bottom: 20,
    left: 20,
    zIndex: 1201
  },
  secondaryColor: {
    color: theme.palette.secondary.main,
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
    borderRadius: 6
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: theme.mixins.toolbar,
});

const drawerWidth = 380;

const Home = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <LeftSideBar classes={classes} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <LagoonMap />
      </main>
    </div>
  );
}

export default withStyles(styles)(Home);
