import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NatureIcon from '@material-ui/icons/Nature';
import { Link } from '@reach/router';
import FilterSelection from './FilterSelection';
import * as SensorContext from '../context/SensorContext';

export const LeftSideBar = props => {
  const { classes } = props;
  return (
    <SensorContext.Consumer>
      {context => (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <FilterSelection />
          <Divider />
          <List>
            {context.saintJohnSensors.map((saintJohn, index) => (
              <Fragment>
                <ListItem>
                  <ul>
                    <li>sensor: {saintJohn.metaData.attributes.LONG_NM}</li>
                    <li>sensor id: {saintJohn.metaData.attributes.HYDRON_NUMBER}</li>
                    <li>data type: {saintJohn.metaData.attributes.PARAM}</li>
                    <li>latitude: {saintJohn.metaData.attributes.LAT_NO}</li>
                    <li>longitude: {saintJohn.metaData.attributes.LONG_NO}</li>
                    <li><a style={{ textDecoration: 'none' }} href={saintJohn.sensorGraphUrl} target="_blank">graph</a></li>
                  </ul>
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>
        </Drawer>
      )
      }

    </SensorContext.Consumer>
  );
}
