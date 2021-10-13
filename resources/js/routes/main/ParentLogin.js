import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLogin from '../../components/layouts/main/auth/LoginForm';
import {useParams} from 'react-router-dom';

const styles = theme => ({
  root: {
    padding: '120px 16px 16px',
  },
  form: {
    width: '100%',
    maxWidth: 360,
    margin: '0 auto',
  },
});

const ParentLogin = ({ classes, history }) => {
  const handleSubmit = (values) => {
    console.log('submitting Parent form', values);
    history.push('/dashboard');
  };
  const {type} = useParams()
  return (
    <div className={classes.root}>
      <FormLogin
        user={type||'Admin'}
        className={classes.form}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

ParentLogin.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  history: PropTypes.object,
};

export default withStyles(styles)(ParentLogin);
