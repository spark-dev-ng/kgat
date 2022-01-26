import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux'
import '../../common/App.css';
import Profile from './Profile'
import Teacher from './Admin/Teacher'
import Teachers from './Admin/Teachers'
import MyClass from './Teacher/MyClass'
import TeacherP from './Teacher/Profile'
import { userActions } from '../../../redux/actions' 
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom'
import AppBarMain from './AppBarMain';

function  Dashboard (){
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
    
    const { user } =  useSelector(state => state.auth)
    let profile_pic ='default.jpg'
    const classes = useStyles();
    // if(user && user.userable)
    //     profile_pic = user && user.userable ? user.user.userable.profile_pic : ''
    // switch (user.userable_type) {
    //   case "APP\\Student":
    //     return (
    //       <Profile user={user} img={`/guardian_photo/${profile_pic}`} />
    //     );
    
    //   default:
    //     return (
    //       <Admin user={user} img={`/guardian_photo/${profile_pic}`} />
    //     );
    return(
      <div className={classes.root}>
        <AppBarMain user={user} />
      <main className={classes.content}>
      <Switch>
        <Redirect from='/dashboard' to='/dashboard/index' exact />
        <Route path='/dashboard/index' component ={Profile} exact/>
        <Route path='/dashboard/profile' component ={TeacherP} exact/>
        <Route path='/dashboard/teachers' component ={Teachers} exact/>
        <Route path='/dashboard/teacher/:id' component ={Teacher} exact/>
        <Route path='/dashboard/teacher/profile' component ={TeacherP} exact/>
        <Route path='/dashboard/students' component ={MyClass} exact/>
      </Switch>
      </main>
      </div>
    )
  }
// }
// const mapStateToProps = (state)=> {
//     const { user } = state.auth
//     console.log({fly_state:user})
//     return  {
//       user
//     } 
// }

// export default connect(mapStateToProps)(Dashboard)
export default Dashboard