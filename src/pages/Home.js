import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NatureIcon from '@material-ui/icons/Nature';
import { fetchSaintJohnSensors } from '../services/saintJohn-service';
import { LeftSideBar } from '../components/LeftSideBar';
import LagoonMap from '../components/LagoonMap';

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