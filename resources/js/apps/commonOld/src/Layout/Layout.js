import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// pages
import AppBarMain from "../containers/Dashboard/AppBarMain";



function Layout(props) {
  var classes = useStyles();

  // global

  return (
    <div className={classes.root}>
        <>
          <AppBarMain />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
          
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
