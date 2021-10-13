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
import { getSchool, getClass } from '../../../helpers'
import ProfileHeader from '../../../components/layouts/main/ProfileHeader'
import {Copyright, Report, useStyles } from './StudentProfile'



export default function TerminalReport({child, session, term}) {
  const classes = useStyles();
  let myChildren = []

  let student = child
  let img = null
  let user = student
  if(user && user.userable){
    myChildren = user.userable.students
  }
  const getSchName =(id)=>{
    return getSchool()[id-1].name;
  }
  const getClsName =(id)=>{
    return getClass()[id-1].name;
  }
  const renderStudent = ()=>{
    if(child){
      const img = child.profile_pix
      return(<CardContent>
          <ProfileHeader
            className={classes.header}
            displayName={user.name}
            bio={user.username}
            coverUrl="https://source.unsplash.com/collection/841904"
            avatarUrl={`../student_photo/${img}`}
            data={{val:[getSchName(user.school_id),getClsName(parseInt(user.class_id)),user.session.name],
              item:['School','Class','Session']}}
          />
        </CardContent>)
    }else{
      return <div>N/A</div>
    }
  }
 const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      
    <AppBarMain student={child} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {renderStudent()} 

        <Report classes={classes} student={child} term={term} session={session}/>

        <Copyright />
      </main>
    </div>
  );
}
