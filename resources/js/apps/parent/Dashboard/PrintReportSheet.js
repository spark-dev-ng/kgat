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
import ReportSheet from'./ResultSheet'
import MyLink from'./ReportLink'
import { URLS } from '../../../redux/constants'
import { getSchool, getClass } from '../../../helpers'
import ReportSheetHeader from '../../../components/layouts/main/ReportSheetHeader'
import logo from '../../../images/logo.png'

export const  Copyright =()=> {                                                   
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        BGWSchools
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
 
const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
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

export const Report = ({session, term, student, classes})=>{
  return(
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ReportSheet student={student} term={term} session={session}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default function PrintReportSheet({student, term, session}) {
  const classes = useStyles(); 

  let img = null

  const getSchName =(id)=>{
    return getSchool()[id-1].name;
  }

  const getClsName =(id)=>{
    return getClass()[id-1].name;
  }

  const renderHeader = ()=>{
    if(student){
      const img = student.profile_pix
      return(
        <CardContent>
          <ReportSheetHeader
            className={classes.header}
            coverUrl="https://source.unsplash.com/collection/841904"
            avatarUrl={logo}
            header={['SCHOOL NAME','SESSION']}
          />
        </CardContent>
      )
    }
  }
  
  const renderReport = ()=>{
    
    if(session){
      return(<Report classes={classes} student={student} term={term} session={session}/>)
    }
    return <div>N/A</div>
  }

const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      
    <AppBarMain student={student} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {renderHeader()} 

        {renderReport()}
        <Copyright />
      </main>
    </div>
  );
}
