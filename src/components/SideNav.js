import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
  list: {
    width: 250,
  },
};

export const useToggleDrawer = initialState => {
  const [isOpen, setIsOpen] = useState(initialState);

  return {
    isOpen,
    setIsOpen
  };

}

const SideNav = props => {
  const { classes, isOpen, setIsOpen } = props;

  return (
    <div>
      <Drawer open={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
        >
          <List className={classes.list}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="sensors" />
            </ListItem>
          </List>
          <Divider />
          <List className={classes.list}>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="other stuff" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );

}

export default withStyles(styles)(SideNav);