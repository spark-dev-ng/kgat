import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {
  Typography,
  CardContent,
  Container,
  Grid,
  Paper, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';

import ProfileHeader from '../../../../components/layouts/main/ProfileHeader'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../redux/actions';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Teacher() {
  const classes = useStyles();
  const {user} = useSelector(state => state.auth)
  // const dispatch = useDispatch();

  if (!user)
    return <h3>Loardin...</h3>

  return (
    <div>
      <CardContent>
        <ProfileHeader
          className={classes.container}
          displayName={user.name}
          bio={user.username}
          coverUrl="https://source.unsplash.com/collection/841904"
          avatarUrl={user.profile_pic}
        ><Typography>Name: {user.name}</Typography>
        </ProfileHeader>
      </CardContent>
      <CardContent className={classes.container}>
        <Grid container spacing={3}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Reg. no.</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.reg_no}</TableCell>
                    <TableCell align="right" className='button'>{user.status?'Susppend':'Activate'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Registered class</TableCell>
                    <TableCell colSpan='3'>{user.class}</TableCell>
                    <TableCell align="right" className='button'>Change</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Classes</TableCell>
                    <TableCell colSpan='3'>{user.classes}</TableCell>
                    <TableCell align="right" className='button'>Change</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Subjects</TableCell>
                    <TableCell colSpan='3'>{user.subjects}</TableCell>
                    <TableCell align="right" className='button'>Change</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  );
}
