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

const ParentProfileStats = ({ classes, className, data }) => (
  <div className={cx(classes.root, className)}>
    <div>
      <Typography variant="h6"></Typography>
      <Typography variant="caption" color="textSecondary">Ahmda</Typography>
    </div>
    <div>
      <Typography variant="h6"></Typography>
      <Typography variant="caption" color="textSecondary">Auwal</Typography>
    </div>
    <div>
      <Typography variant="h6">Musa</Typography>
      <Typography variant="caption" color="textSecondary">Sani</Typography>
    </div>
  </div>
);

ParentProfileStats.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  data: PropTypes.object,
};

export default withStyles(styles)(ParentProfileStats);
