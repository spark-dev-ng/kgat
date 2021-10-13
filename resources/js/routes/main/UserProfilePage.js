import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UserProfile from '../../components/layouts/main/auth/UserProfile';

const styles = theme => ({
  root: {
    padding: '10px',
  },
  page: {
    width: '80%',
    margin: '0 auto',
  },
});

const UserProfilePage = ({ classes, history }) => {
  return (
    <div className={classes.root}>
      <UserProfile
        className={classes.page}
      />
    </div>
  )
}

export default withStyles(styles)(UserProfilePage)
