/* eslint-disable no-script-url */
import React, {useCallback, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core';

import Title from '../Title';
import { userActions } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Ishaq', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  top:{
    marginTop:300
  }
}));

export default function Teachers() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {teachers} = useSelector(state=>state.users);

  useEffect(()=>{
    dispatch(userActions.getTeachers());
  },[])

  return (
    <div className={classes.top}>
      <Title>Enroled teachers</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Reg. no.</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers && teachers.map((row,i) => (
            <TableRow key={i+1}>
            <TableCell>{i+1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.reg_no}</TableCell>
              <TableCell align="right" className='button'><Link to={`/dashboard/teacher/${row.id}`}>View</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" to="#">
          See more....
        </Link>
      </div>
    </div>
  );
}
