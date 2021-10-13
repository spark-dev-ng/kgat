import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import logo from '../../../../images/logo.png'
const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  submitButton: {
    marginTop: 24,
  },
container: {
    width: '100%'
},
logo: {
    width: 100,
    height:100
},
logoContainer:{
    textAlign:'center',
},
clearBtn:{
    float:'right'
}
})

const FormSignUp = ({ classes, className, onSubmit }) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = key => e => {
    setValues({ ...values, [key]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Paper className={className}>
      <CardContent>
        <div  className={classes.logoContainer}>
            <img
                className={classes.logo}
                src={logo}
            />
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="Email"
            margin="normal"
            value={values.email}
            onChange={handleChange('email')}
            required
          />
          <TextField
            type="text"
            label="Username"
            margin="normal"
            value={values.username}
            onChange={handleChange('username')}
            required
          />
          <TextField
            type="password"
            label="Password"
            margin="normal"
            value={values.password}
            onChange={handleChange('password')}
            required
          />
          <TextField
            type="password"
            label="Confirm password"
            margin="normal"
            value={values.passwordConfirm}
            onChange={handleChange('passwordConfirm')}
            required
          />
          <Button
            className={classes.submitButton}
            variant="contained"
            type="submit"
            color="primary"
          >
            Sign-Up
          </Button>
        </form>
      </CardContent>
    </Paper>
  );
};

FormSignUp.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

FormSignUp.defaultProps = {
  onSubmit: () => { },
};

export default withStyles(styles)(FormSignUp);
