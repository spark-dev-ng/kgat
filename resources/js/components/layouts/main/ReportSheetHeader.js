import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import ParentProfileStats from './ParentProfileStats';

const styles = theme => ({
  root: {
  },
  header: {
    height: 210,
    background: theme.palette.grey[300],
  },
  main: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  avatar: {
    marginTop: -100,
    height: 180,
    width: 180,
    background: theme.palette.grey[100],
  },
  stats: {
    maxWidth: 300,
    margin: '0 auto',
  }
});

const ReportSheetHeader = ({ classes, displayName, avatarUrl, coverUrl, header, className }) => {
  const headerStyle = coverUrl
    ? { backgroundImage: `url('${coverUrl}')` }
    : null;

  return (
    <Paper elevation={1} className={cx(classes.root, className)}>
      <div className={classes.header} style={headerStyle} />
      <div className={classes.main}>
        <Avatar className={classes.avatar} src={avatarUrl} />
        <Typography variant="h4">{header[0]}</Typography>
        <Typography variant="h5">{header[1]}</Typography>
      </div>
    </Paper>
  );
};

ReportSheetHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  coverUrl: PropTypes.string,
  avatarUrl: PropTypes.string,
  displayName: PropTypes.string,
  /*stats: PropTypes.shape({
    posts: PropTypes.number,
    followers: PropTypes.number,
    following: PropTypes.number,
  })*/
};

export default withStyles(styles)(ReportSheetHeader);
