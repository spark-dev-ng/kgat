import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';

const NavListItem = ({ children, ...props }) => (
  <ListItem  dense button {...props}>
     {children}
  </ListItem>
);

export default NavListItem;
