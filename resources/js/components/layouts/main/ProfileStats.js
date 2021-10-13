import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: '8px 16px',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
});

const ProfileStats = ({ classes, className, parents, teachers, students }) => (
  <div className={cx(classes.root, className)}>
    <div>
      <Typography variant="h6">{teachers}</Typography>
      <Typography variant="caption" color="textSecondary">Teachers</Typography>
    </div>
    <div>
      <Typography variant="h6">{students}</Typography>
      <Typography variant="caption" color="textSecondary">Students</Typography>
    </div>
    <div>
      <Typography variant="h6">{parents}</Typography>
      <Typography variant="caption" color="textSecondary">Parents</Typography>
    </div>
  </div>
);

ProfileStats.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  posts: PropTypes.number,
  followers: PropTypes.number,
  following: PropTypes.number,
};

export default withStyles(styles)(ProfileStats);
