import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import CodeIcon from '@material-ui/icons/Code';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import * as SensorContext from '../context/SensorContext';

const styles = theme => ({
  list: {
    width: 250,
  },
  toolbar: theme.mixins.toolbar,
});

export const useToggleDrawer = initialState => {
  const [isOpen, setIsOpen] = useState(initialState);

  return {
    isOpen,
    setIsOpen
  };
};

export const useDataSetSelection = () => {
  const [selectedDataSets, setSelectedDataSets] = useState({ kilroy: true, lobo: true, saint_john: true });
  const handleChangedDataSet = value => setSelectedDataSets(selectedDataSets => ({ ...selectedDataSets, ...value }));
  return {
    selectedDataSets,
    setSelectedDataSets,
    handleChangedDataSet
  };
};

const RightSideNav = props => {
  const { classes, isOpen, setIsOpen } = props;
  const {
    selectedDataSets,
    setSelectedDataSets,
    handleChangedDataSet
  } = useDataSetSelection();
  return (
    <SensorContext.Consumer>
      {context => (
        <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <div
            tabIndex={0}
            role="button"
          >
            <div className={classes.toolbar} />
            <List
              className={classes.list}
              subheader={<ListSubheader component="div">Data Set Locations</ListSubheader>}
            >
              <ListItem>
                <ListItemIcon>
                  {!!selectedDataSets.kilroy ? <GpsFixedIcon /> : <GpsNotFixedIcon />}
                </ListItemIcon>
                <ListItemText primary="Kilroy" />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={() => {
                      handleChangedDataSet({ kilroy: !selectedDataSets.kilroy });
                      context.toggleKilroyDataVisibility(!context.kilroyDataVisibility);
                    }}
                    checked={!!selectedDataSets.kilroy}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {!!selectedDataSets.lobo ? <GpsFixedIcon /> : <GpsNotFixedIcon />}
                </ListItemIcon>
                <ListItemText primary="Lobo" />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={() => {
                      handleChangedDataSet({ lobo: !selectedDataSets.lobo });
                      context.toggleLoboDataVisibility(!context.loboDataVisibility);
                    }}
                    checked={!!selectedDataSets.lobo}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {!!selectedDataSets.saint_john ? <GpsFixedIcon /> : <GpsNotFixedIcon />}
                </ListItemIcon>
                <ListItemText primary="Saint John" />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={() => {
                      handleChangedDataSet({ saint_john: !selectedDataSets.saint_john });
                      context.toggleSaintJohnDataVisibility(!context.saintJohnDataVisibility);
                    }}
                    checked={!!selectedDataSets.saint_john}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </Drawer>
      )}

    </SensorContext.Consumer>
  );

}

export default withStyles(styles)(RightSideNav);