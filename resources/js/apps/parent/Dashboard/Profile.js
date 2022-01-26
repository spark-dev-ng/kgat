import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Typography, 
    CardContent, 
    Container,
    Link,
    Grid,
    Paper
} from '@material-ui/core';
import Students from'./Students'
import Teacher from'./Teacher/Profile'
import ProfileHeader from '../../../components/layouts/main/ProfileHeader'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../redux/actions';
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

export default function Profile() {
  const {user} = useSelector(state=>state.auth)
  const classes = useStyles();
  const dispatch = useDispatch();
  let myChildren = []
  const img = user.profile_pic
  React.useEffect(()=>{
    if(!user)
      dispatch(userActions.getAuth());
  },[0])

  if(user && user.userable){
    myChildren = user.userable.students
  }
  return (
    <div>
        <CardContent>
          <ProfileHeader
            className={classes.container}
            displayName={user.name}
            bio={user.username}
            coverUrl="https://source.unsplash.com/collection/841904"
            avatarUrl={img}
            data={{val:[3,'2019/2020','30,000.00'],
              item:['Children','Session','Debt']}}
          />
        </CardContent>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Students students={myChildren}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
    </div>
  );
}
