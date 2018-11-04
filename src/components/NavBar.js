import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import RightSideNav, { useToggleDrawer } from './RightSideNav'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    position: 'absolute',
    width: '100%',
    zIndex: '1400',
  },
  menuButton: {
    marginLeft: 'auto',
    marginRight: -10,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});

const NavBar = props => {
  const { classes } = props;
  const { isOpen, setIsOpen } = useToggleDrawer(false);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Lagoonistics
          </Typography>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <SettingsIcon onClick={() => setIsOpen(!isOpen)} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <RightSideNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);