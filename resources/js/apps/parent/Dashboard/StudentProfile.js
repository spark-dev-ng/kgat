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
import ReportSheet from'./ReportSheet'
import MyLink from'./ReportLink'
import { URLS } from '../../../redux/constants'
import { getSchool, getClass } from '../../../helpers'
import ProfileHeader from '../../../components/layouts/main/ProfileHeader'

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
  if(student){
   const child = student
  
    return(
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ReportSheet student={child} term={term} session={session}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
  return <div>N/A</div>
    
}
export const ReportLink = ({sessions, term, student, classes})=>{
  return(
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <MyLink student={student} term={term} sessions={sessions}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default function StudentProfile({child, no_reports, sessions, session}) {
  const classes = useStyles();
  let new_session ={}
  
  let student = child
  let img = null
  let user = student

  const getSchName =(id)=>{
    return getSchool()[id-1].name;
  }
  const getClsName =(id)=>{
    return getClass()[id-1].name;
  }
  const renderStudent = ()=>{
    if(child){
      const img = child.profile_pix
      return(
        <CardContent>
          <ProfileHeader
            className={classes.header}
            displayName={user.name}
            bio={user.username}
            coverUrl="https://source.unsplash.com/collection/841904"
            avatarUrl={`${URLS.PUBLIC_ROOT}/student_photo/${img}`}
            data={{val:[getSchName(user.school_id), getClsName(parseInt(user.class_id)),user.current_session.name],
              item:['School','Class','Session']}}
          />
        </CardContent>
      )
    }
    return <div>N/A</div>
  }

  const renderReports = ()=>{
    if(! no_reports && !session){
      return(
        <>
          <Report classes={classes} student={child} term={1} session={child? child.current_session : {}}/>

          <Report classes={classes} student={child} term={2} session={child? child.current_session : {}}/>

          <Report classes={classes} student={child} term={3} session={child? child.current_session : {}} />
        </>
      )
    }
  }

  const RenderSessions = ()=>{
    if(sessions && sessions.length>0){
      return(<ReportLink sessions={sessions} classes={classes} student={child} />)
    }else{
        return <div>N/A</div>
      }
  }

  const RenderRes = ()=>{
    
    if(session){

      if(sessions && sessions.length>0 && child)
        new_session = sessions.find(ses=>(parseInt(ses.id) == parseInt(session)))
        
      return(
        <>
          <Report classes={classes} student={child} term={1} session={new_session}/>

          <Report classes={classes} student={child} term={2} session={new_session}/>

          <Report classes={classes} student={child} term={3} session={new_session}/>
        </>
      )
    }
      return <div>N/A</div>
  }

 const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      
    <AppBarMain student={child} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {renderStudent()} 

        {renderReports()}
        {RenderSessions()}
        {RenderRes()}
        <Copyright />
      </main>
    </div>
  );
}
