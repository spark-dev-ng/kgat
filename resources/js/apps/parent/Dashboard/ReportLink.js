/* eslint-disable no-script-url */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  link:{
    textDecoration:'none'
  }
}));


export default function ReportSheet({student, term, sessions}) {
  let i = 0;
  const classes = useStyles()

  return sessions.map(session=>(
      <h5 key={session.id}>{i+=1}&nbsp;
      <Link className={classes.link} to={`/g-child-view-reports/${student.id}/${session.id}`} style={{textDecoration:'none'}}>View {session.name} Report sheet</Link>
    </h5>))
}
