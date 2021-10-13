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
import InputSearch from './InputSearch';
import ActivityListItem from './ActivityListItem';
import NavListItem from './NavListItem';
import logo from '../../../images/logo.png'



const styles = theme => ({
  root: {},
  appBar: {
    background: '#9CD81D',
    color: 'white'
  },
  toolbar: {
    width: '100%',
    maxWidth: theme.layout.contentMaxWidth,
    margin: '0 auto',
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
    margin: '10px',
    color: '#FFFFFF'
  },
  link: {
    textDecoration: 'none',
  },
  logo: {
    marginLeft: '-120px',
    marginRight: '20px'
  }
});


const AuthBar = ({ classes, children }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationButton = useRef();

  const handleToggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };
  const handleToggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  const [loginOpen, setLoginOpen] = useState(false);
  const loginButton = useRef();

  const handleToggleNLogin = () => {
    setLoginOpen(!loginOpen);
  };

  return (
    <AppBarBase className={classes.appBar} position="static" color="default">
      <Toolbar className={classes.toolbar}>
        <Avatar
          className={classes.icon, classes.logo}
          src={logo}
        />
        <Typography variant="h4" color="inherit">
          <Link className={classes.link} to="/">KGAT Academy</Link>
        </Typography>
        <InputSearch
          className={classes.search}
          placeholder="Search"
          fullWidth={false}
        />
      </Toolbar>
      <Avatar
        className={classes.icon}
        src={logo}
      />
    </AppBarBase >
  );
};

AuthBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node,
};

export default withStyles(styles)(AuthBar);
