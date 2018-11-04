import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import NatureIcon from '@material-ui/icons/Nature';
import CodeIcon from '@material-ui/icons/Code';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import { get } from 'lodash/get';

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
    <div>
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
                  onChange={() => handleChangedDataSet({ kilroy: !selectedDataSets.kilroy })}
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
                  onChange={() => handleChangedDataSet({ lobo: !selectedDataSets.lobo })}
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
                  onChange={() => handleChangedDataSet({ saint_john: !selectedDataSets.saint_john })}
                  checked={!!selectedDataSets.saint_john}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Divider />
          <List className={classes.list}>
            <ListItem button>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="other stuff" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );

}

export default withStyles(styles)(RightSideNav);