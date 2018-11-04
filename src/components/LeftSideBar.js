import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NatureIcon from '@material-ui/icons/Nature';
import FilterSelection from './FilterSelection';

export const LeftSideBar = props => {
  const { classes } = props;
  return (
    <Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <FilterSelection />
        <Divider />
        <List>
          <ListItem>
            <NatureIcon className={classes.secondaryColor} />
            <ListItemText styles={{ color: '#fff' }} primary="Lagoon sensor" />
          </ListItem>
        </List>
      </Drawer>
    </Fragment>
  );
}
