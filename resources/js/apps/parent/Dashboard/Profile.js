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
import AppBarMain from './AppBarMain'
import Students from'./Students'

import ProfileHeader from '../../../components/layouts/main/ProfileHeader'
function Copyright() {                                                   
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        School
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
 
const drawerWidth = 240;

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

export default function Profile({ user, img }) {
  const classes = useStyles();
  let myChildren = []
  if(user && user.userable){
    myChildren = user.userable.students
  }
 const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      
    <AppBarMain />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <CardContent>
          <ProfileHeader
            className={classes.header}
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
        <Copyright />
      </main>
    </div>
  );
}
