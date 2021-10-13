import React from 'react';
import {Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

export default function ParentOption() {
  
  const uiStyle =  makeStyles(theme=>({
    linkTxt:{
      textDecoration: 'none'
    },
  }))
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = uiStyle();
  return (
    <div>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        Manage
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}><Link to="/" className={classes.linkTxt} >Profile</Link></MenuItem>
        <MenuItem onClick={handleClose}>Pay</MenuItem>
        <MenuItem onClick={handleClose}>Print result</MenuItem>
        <MenuItem onClick={handleClose}>Request transfer</MenuItem>
      </Menu>
    </div>
  );
}