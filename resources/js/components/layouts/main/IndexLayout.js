import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { AppBar, Footer} from './';

const styles = theme => ({
  root: {
    minWidth: '80%',
  },
  wrapper: {
    width: '100%',
    maxWidth: theme.layout.contentMaxWidth,
    margin: '0 auto',
    padding: '0',
    display: 'flex',
  },
  
  main: {
    marginLeft: theme.spacing(3),
    maxWidth: '100%',
    flex: 1,
  },
});

const IndexLayout = ({ classes, children }) => (
  <div className={classes.root}>
    <AppBar />
    <main className={classes.wrapper}>
      <div className={classes.main}>
        {children}
      </div>
    </main>
    <Footer/>
  </div>
);

IndexLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node,
};

export default withStyles(styles)(IndexLayout);
