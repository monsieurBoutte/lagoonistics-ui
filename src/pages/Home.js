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
  },
  secondaryColor: {
    color: theme.palette.secondary.main,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const drawerWidth = 300;

const Home = props => {
  const [saintJohnSensorInfo, setSaintJohnSensorInfo] = useState([]);
  const { classes } = props;

  useEffect(() => {
    setSaintJohnSensorInfo(fetchSaintJohnSensors());
  }, [])

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