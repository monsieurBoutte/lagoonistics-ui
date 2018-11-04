import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NatureIcon from '@material-ui/icons/Nature';
import CodeIcon from '@material-ui/icons/Code';


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

}

const RightSideNav = props => {
  const { classes, isOpen, setIsOpen } = props;

  return (
    <div>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
        >
          <div className={classes.toolbar} />
          <List className={classes.list}>
            <ListItem button>
              <ListItemIcon>
                <NatureIcon />
              </ListItemIcon>
              <ListItemText primary="sensors" />
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