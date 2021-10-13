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
      <Typography variant="h6">{data.item[0]}</Typography>
      <Typography variant="caption" color="textSecondary">{data.val[0]}</Typography>
    </div>
    <div>
      <Typography variant="h6">{data.item[1]}</Typography>
      <Typography variant="caption" color="textSecondary">{data.val[1]}</Typography>
    </div>
    <div>
      <Typography variant="h6">{data.item[2]}</Typography>
      <Typography variant="caption" color="textSecondary">{data.val[2]}</Typography>
    </div>
  </div>
);

ParentProfileStats.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  data: PropTypes.object,
};

export default withStyles(styles)(ParentProfileStats);
