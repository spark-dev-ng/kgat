import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import {
  List,
  Avatar,
  Popover,
  Toolbar,
  AppBar as AppBarBase,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';

import LockOpen from '@material-ui/icons/LockOpen';
import EditIcon from '@material-ui/icons/Edit';
import Info from '@material-ui/icons/Info';
import InputSearch from './InputSearch';
import ActivityListItem from './ActivityListItem';
import NavListItem from './NavListItem';
import logo from '../../../images/logo.png'



const styles = theme => ({
  root: {},
  appBar: { 
    background: '#9CD81D',
    color:'white',
    boxShadow: '3px 3px 5px 6px #ccc'
  },
  toolbar: {
    width: '100%',
    maxWidth: theme.layout.contentMaxWidth,
  },
  flex: {
    flexGrow: 1,
  },
  search: {
    marginLeft: theme.spacing(3),
    background: theme.palette.grey[200],
    width: 250,
  },
  icon: {
    marginRight: theme.spacing(3),
    margin: '0px',
    fontWeight:'bolder',
    color:'#FFFFFF',
    diplay:'inlineBlock'
  },
  btn:{
    color: "green",
    textTransform: 'none',
    textDecoration:'none',
  },
  btn2: { 
    textTransform: 'none',
    color:'#FFFFFF',
    fontSize:'30'
  },
  link:{
    textDecoration:'none',
    fontSize:'30'
  },
  logo: { 
    marginLeft: '0px',
    marginRight:'0px'
  }
});


const AppBar = ({ classes, children }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationButton = useRef();

  const [loginOpen, setLoginOpen] = useState(false);
  const loginButton = useRef();

  const [registerOpen, setRegisterOpen] = useState(false);
  const registerButton = useRef();

  const handleToggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleToggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  const handleToggleRegister = () => {
    setRegisterOpen(!registerOpen);
  };

  return (
    <AppBarBase className={classes.appBar} position="static" color="default">
      <Toolbar className={classes.toolbar}>
      <Avatar
          className={classes.icon, classes.logo}
          src={logo}
        />
        <Typography variant="h4" color="inherit">
          <Link style={{textDecoration: 'none'}} to="/">KGAT Academy</Link>
        </Typography>
       
        <div className={classes.flex} />
        
        
        <IconButton
          className={classes.icon}
          onClick={handleToggleRegister}
          ref={registerButton}
        >
          <EditIcon />
          <span>Register</span>
        </IconButton>

        <Popover
          open={registerOpen}
          anchorEl={registerButton.current}
          onClose={handleToggleRegister}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List style={{fontSize:'10'}}>
            <NavListItem> 
              <Button className={classes.btn}>
              <Link style={{textDecoration: 'none'}} to="/register/Guardian">Guardian</Link>
              </Button>
            </NavListItem>
            <NavListItem> 
              <Button className={classes.btn}>
              <Link style={{textDecoration: 'none'}} to="/register/Student">Student</Link>
              </Button>
            </NavListItem>
          </List>
        </Popover>
        <IconButton
          className={classes.icon}
          onClick={handleToggleLogin}
          ref={loginButton}
        >
          <LockOpen />
          <span>Login</span>
        </IconButton>
        <Popover
          open={loginOpen}
          anchorEl={loginButton.current}
          onClose={handleToggleLogin}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
        <List>
          <NavListItem> 
            <Button className={classes.btn}>
              <Link style={{textDecoration: 'none'}}   to="/login/Admin">Admin</Link>
            </Button>
          </NavListItem>
          <NavListItem> 
            <Button className={classes.btn}>
              <Link style={{textDecoration: 'none'}}  to="/login/Teacher">Teacher</Link>
            </Button>
          </NavListItem>
          <NavListItem> 
            <Button className={classes.btn}>
              <Link style={{textDecoration: 'none'}} to="/login/Guardian">Guardian</Link>
            </Button>
          </NavListItem>
          <NavListItem> 
            <Button className={classes.btn}>
              <Link style={{textDecoration: 'none'}} to="/login/Student">Student</Link>
            </Button>
          </NavListItem>
        </List>
        </Popover>
        <IconButton
          className={classes.icon}
          onClick={handleToggleNotification}
          ref={notificationButton}
        >
          <Info />About
          
        </IconButton>
        <Popover
          open={notificationOpen}
          anchorEl={notificationButton.current}
          onClose={handleToggleNotification}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List>
            <NavListItem> 
              <Button className={classes.btn}>
                <Link style={{textDecoration: 'none'}} to="/about">About project</Link>
              </Button>
            </NavListItem> 
            <NavListItem> 
              <Button className={classes.btn}>
                <Link style={{textDecoration: 'none'}} to="/about">About dependacies</Link>
              </Button>
            </NavListItem> 
            <NavListItem> 
              <Button className={classes.btn}>
                <Link style={{textDecoration: 'none'}} to="/about">About developer</Link>
              </Button>
            </NavListItem> 
          </List>
        </Popover>
      </Toolbar>
    </AppBarBase >
  );
};

AppBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node,
};

export default withStyles(styles)(AppBar);
