import React from 'react'
import { Route, Router, Redirect } from 'react-router-dom'
import { history } from './helpers'
// import { ThemeProvider } from "@material-ui/styles";
// import { CssBaseline } from "@material-ui/core";
// import Themes from "./admin-hook/themes";
// import { LayoutProvider } from "./admin-hook/context/LayoutContext";
// import { UserProvider } from "./admin-hook/context/UserContext";
import GuardianProfile from './apps/parent/dashboard/index';
import ChildProfile from './apps/parent/dashboard/Student';
import TerminalReport from './apps/parent/dashboard/TerminalReportConnected';
import SessionReport from './apps/parent/dashboard/Session';
import MainSession from './apps/parent/dashboard/MainSession';
 import {
  PageIndex,
  LoginPage,  
  UserProfilePage ,
  PageSignUp,
  RegSuccess
  } from './routes/main'
// import App from './admin-hook/components/App'
// const AdminApp =()=>{
//   return <LayoutProvider>
//     <UserProvider>
//       <ThemeProvider theme={Themes.default}>
//         <CssBaseline />
//         <App />
//       </ThemeProvider>
//     </UserProvider>
//   </LayoutProvider>
// }



const Application  = () => {
  // const user  = useSelector(state =>state.auth.user);
 const user = localStorage.getItem('user')
  const token = localStorage.getItem('token');
console.error({user})
const GuardianRoute = ({ component: Component, user,...rest }) => (
    <Route {...rest} render={props => (
        (user && user.userable_type.length>0)||token
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
// const AdminRoute = ({ component: Component, user, ...rest }) => (
//     <Route {...rest} render={props => (
//        ( user && user.userable_type.length>0 )||token
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )
const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    (user && user.id>0)||token
        ? <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
        : <Component {...props} />
  )} />
)
  return (  
      <Router history={history}>
          <Route path="/" exact component={PageIndex} />
          <AuthRoute path="/login/:type?" component={LoginPage} />
          <AuthRoute path="/register/:type?" component={PageSignUp} />
          <Route path="/profile" component={UserProfilePage} />
          <GuardianRoute path="/dashboard/" component={GuardianProfile} />
          <GuardianRoute path="/g-child/:id" component={ChildProfile} />
          <GuardianRoute path="/g-child-report/:id/:session/:term" component={TerminalReport} />
          <GuardianRoute path="/g-child-ses-reports/:id/:session" component={SessionReport} />
          <GuardianRoute path="/g-child-view-reports/:id/:session" component={MainSession} />
          {/* <AdminRoute path="/auth" exact component={AdminApp} /> */}
          <Route path="/register-success/:id?" exact component={RegSuccess} />
          {/* <Route path="/app" exact component={App2} /> */} 
      </Router>
  )
} 

export default Application;
