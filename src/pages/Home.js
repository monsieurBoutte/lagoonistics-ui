import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import LagoonMap from '../components/LagoonMap';
import { fetchSaintJohnSensors } from '../services/saintJohn-service';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
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

const drawerWidth = 250;

const Home = props => {
  const [saintJohnSensorInfo, setSaintJohnSensorInfo] = useState([]);
  const { classes } = props;

  useEffect(() => {
    setSaintJohnSensorInfo(fetchSaintJohnSensors());
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem>
            <NatureIcon />
            <ListItemText primary="Lagoon sensor" />
            <ul>
              <li>Water Temp: 80%</li>
              <li>DO: 4</li>
              <li>PH: 42</li>
            </ul>
          </ListItem>
          <ListItem>
            <NatureIcon />
            <ListItemText primary="Hollywood sensor" />
            <br />
            <ul>
              <li>Water Temp: 60%</li>
              <li>DO: 9</li>
              <li>PH: 72</li>
            </ul>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <LagoonMap />
      </main>
    </div>
  );
}

export default withStyles(styles)(Home);