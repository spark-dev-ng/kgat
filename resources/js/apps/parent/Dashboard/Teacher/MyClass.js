/* eslint-disable no-script-url */
import React, {useCallback, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Checkbox, FormControlLabel, IconButton, Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core';
import moment from 'moment';
import Title from '../Title';
import { userActions } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { userService } from '../../../../redux/services';
import { reduxForm, Field } from 'redux-form'

import SaveIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  top:{
    marginTop:100
  }
}));

function renderCheckbox({ input, label }){
  return (<div>
      <FormControlLabel
          control={
          <Checkbox
              checked={input.value ? true : false}
              onChange={input.onChange}
          />
          }
          label={label}
      />
  </div>)
  }
  
export default function MyClass() {

  const classes = useStyles();
  const [students,setStudents]= React.useState([]);
  const [attends,setAttends]= React.useState([]);
  const [attended,setAttended]= React.useState([]);
  const {user} = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const handleSubmit = () =>{
    dispatch(userActions.getAuth());
    userService.customPost('teacher/students/attendance',
    {
      students:attends,
      teacher:user.userable_id,
      class:user.teacher.class
    })
    .then(res=>{console.log(res);})
    .catch(error=>console.error(error));
  }

  useEffect(()=>{
    userService.customGet(`teacher/students/${user.id}`)
    .then(res=>{
      if(res.success){
        setStudents(res.students)
      }
    })
    .catch(error=> console.error(error));
    userService.customPost(`teacher/students/attendence`,
      {
        teacher_id:user.userable_id,
        class:user.teacher.class,
        date:moment().format('YYYY-MM-DD')
    })
    .then(res=>{
      if(res.success){
        setAttended(res.students)
      }
    })
    .catch(error=> console.error(error));
  },[])

  return (
    <div className={classes.top}>
      <Title>{user.teacher.class} Students attended {attended.length}</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Reg. no.</TableCell>
            <TableCell align="right">Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students && students.map((row,i) => (
            <TableRow key={i+1}>
            <TableCell>{i+1}</TableCell>
              <TableCell><Link to={`/dashboard/teacher/${row.id}`}>{row.first_name} {row.other_name} {row.last_name}</Link></TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.reg_no}</TableCell>
              <TableCell align="right">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={attended.length ? attended.map(at=>at.student_id).includes(row.id): attends.includes(row.id)}
                    onChange={()=>{
                      attends.includes(row.id)?
                        setAttends(attends.filter(it=>it!==row.id)) 
                      :setAttends([...attends,row.id])}}
                  />
                }
                label={'Attended'}
              />
                
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan='5' align="right">
              <IconButton onClick={()=>{handleSubmit()}}><SaveIcon/> Save</IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>      
    </div>
  );
}
// export default connect()(MyClass);
