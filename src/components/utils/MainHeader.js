import React from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { Settings } from '@material-ui/icons';
import history from './history';

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerMainContainer: {
    background: theme.palette.hGradient,
  },
  headerTitleEwallet: {
    padding: '1%',
    width: '20%',
    fontWeight: 600,
  },
  headerTitleWelcome: {
    textAlign: 'right ',
  },
  headerWelcome: {
    fontSize: '1em',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  headerLogout: {
    textAlign: 'center ',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'right ',
      paddingRight: '6%',
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    margin: 20,
  },
  headerLink: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexGrow: '1',
  },
  eventLink: {
    margin: 24,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    color: 'white',
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

const MainHeader = () => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogoutClick = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes.headerMainContainer}>
        <div className={classes.sectionDesktop} />
        <Typography variant="h4" noWrap className={classes.headerTitleEwallet}>
          Merchant Details
        </Typography>
        <div className={`headerLink ${classes.headerLink}`}>
          <Link to="/merchant/dashboard" style={{ textDecoration: 'none' }}>
            <Typography
              className={`${classes.title} ${classes.eventLink}`}
              variant="h5"
              noWrap
            >
              Dashboard
            </Typography>
          </Link>
          <Link to="/merchant/user" style={{ textDecoration: 'none' }}>
            <Typography
              className={`${classes.title} ${classes.eventLink}`}
              variant="h5"
              noWrap
            >
              Users
            </Typography>
          </Link>
          <Link
            to="/merchant/branch"
            style={{ textDecoration: 'none', fontWeight: '600' }}
          >
            <Typography
              className={`${classes.title} ${classes.eventLink}`}
              variant="h5"
              noWrap
            >
              Branch
            </Typography>
          </Link>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            onClick={handleClick}
            color="inherit"
            aria-label="setting"
            component="span"
          >
            <Settings />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.headerLogout}
          >
            Welcome Hatim
          </Typography>
          <Menu
            style={{ padding: '1%' }}
            id="simple-menu"
            elevation={1}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>

            <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
