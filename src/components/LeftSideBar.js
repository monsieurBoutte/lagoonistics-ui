import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CodeIcon from '@material-ui/icons/Code';
import NatureIcon from '@material-ui/icons/Nature';

export const LeftSideBar = props => {
  const { classes } = props;

  return (
    <div>
      <Drawer variant="permanent">
        <div
          tabIndex={0}
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
        >
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
