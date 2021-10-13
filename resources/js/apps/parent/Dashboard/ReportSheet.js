/* eslint-disable no-script-url */
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';



const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function ReportSheet({student, term, session}) {

  const getResults = (results)=>{
    let rawResults = {}
    if(session){
      rawResults = results.filter(res=> parseInt(res.session.id) == parseInt(session.id))
      
      if(rawResults.length>0)
        rawResults = results.filter(res=> parseInt(res.term_id) == parseInt(term))
    }
    return rawResults
  }
  const getSubject = (id)=>{
    const subjects = student.subjects
    if(subjects)
      return subjects.find(subject=>subject.id==id)
    return {}
  }

  const renderPrefix = (term)=>{
    let word = ''
    if(term ==1)
      word = 'First'
    else if (term ==2)
      word ='Second'
    else word = 'Third'

    return word
  }

  const renderSession = ()=>{
    let word = ''

    if(session)
      word =  session.name

    return word
  }
  
  const getRemark = (row)=>{
    let ca = parseInt(row.ca)
    let score = parseInt(row.score)
    let $result = ca+score

    let total = "";
    if ($result >= 60 && $result < 70)
        total = "B";
    else if ($result >= 50 && $result < 60)
        total = "C";

    else if ($result >= 40 && $result < 50)
        total = "D";

    else if ($result >= 30 && $result < 40)
        total = "E";

    else if ($result < 30)
        total = "F";
    else
        total = "A";

    return total
  }

  const classes = useStyles();
  let rows = []
  let i =0;

  if(student){
    rows = getResults(student.results)  
  }
  if(rows.length>0){

    return (
      <React.Fragment>
        <Title>{renderPrefix(term)} Term {session.name} Report sheet</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>CA</TableCell>
              <TableCell>Exam</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{i+=1}</TableCell>
                <TableCell>{getSubject(parseInt(row.subject_id)).name}</TableCell>
                <TableCell>{row.ca}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell align="right">{parseInt(row.ca)+parseInt(row.score)}</TableCell>
                <TableCell align="right">{getRemark(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" to={`/g-child-report/${student.id}/${session.id}/${term}`}>Print</Link>
        </div>
      </React.Fragment>
    );
  }else{
    return(
      <>
        <Title>{renderPrefix(term)} Term {renderSession()} Report sheet</Title>
        <div>RESULT NOT AVAILABLE</div>
      </>
    )
  }
}
