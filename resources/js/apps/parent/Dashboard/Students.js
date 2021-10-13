/* eslint-disable no-script-url */
import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import {  Button,
          IconButton,
          Menu,
          MenuItem,
          ListItemIcon,
          ListItemText,
          InboxIcon,
          DraftsIcon,
          SendIcon,
          TableHead,
          TableCell,
          TableBody,
          TableRow,
          Table,
        } from '@material-ui/core';
import {  Edit } from '@material-ui/icons';
import ParentOption from './ParentOption'
import { getSchool, getClass } from '../../../helpers'
// Generate Order Data

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const getSchName =(id)=>{
  return getSchool()[id-1].name;
}
const getClsName =(id)=>{
  return getClass()[id-1].name;
}

export default function Students({students}) {
  const classes = useStyles();
  
  let i = 0
  return (
    <React.Fragment>
      <Title>My Children</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell># Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>School</TableCell>
            <TableCell >Class</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {students && students.map(row => (
            <TableRow key={row.id}>
              <TableCell>{i+=1} <img src={`/student_photo/${row.profile_pix}`} width='50' height='50' /></TableCell>
              <TableCell><Route style={{textDecoration: 'none'}} to={`g-child/${row.id}`}>{row.name}</Route></TableCell>
              <TableCell>{row.dob}</TableCell>
              <TableCell>{getSchName(row.school_id)}</TableCell>
              <TableCell>{getClsName(parseInt(row.class_id))}</TableCell>
              <TableCell align="right"><ParentOption /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#">
          Manage children
        </Link>
      </div>
    </React.Fragment>
  );
}
