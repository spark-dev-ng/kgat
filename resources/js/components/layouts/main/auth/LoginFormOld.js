import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { reduxForm } from 'redux-form'
import { Button, 
    TextField,
    Paper,
    Typography,
    CardContent } from '@material-ui/core';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  submitButton: {
    marginTop: 24,
  }
});

class LoginForm extends Component{
    constructor(props) {
        super(props)

        this.state ={
            email:'', setEmail:'',password:'', setPassword:'',
        }
    }
  
    handleLoginSubmit({ email, password }) {
        //e.preventDefault();
        //onSubmit({ email, password });
        console.log({ email, password });
    }
  
  render(){
      console.log(this.props)
    const {classes, className, handleSubmit, fields:{email, password} } = this.props

    return (
        <Paper className={className}>
        <CardContent>
            <Typography variant="h4" align="center">Login</Typography>
            <form className={classes.form} onSubmit={handleSubmit(this.handleLoginSubmit.bind(this))}>
            <TextField
                type="text"
                label="Email"
                margin="normal"
                onChange={(e) => this.setState({email:e.target.value})}
                value={this.state.email}
                required
            />
            <TextField
                type="password"
                label="Password"
                margin="normal"
                onChange={(e) => this.setState({password:e.target.value})}
                value={this.state.password}
                required
            />
            <Button
                className={classes.submitButton}
                variant="contained"
                type="submit"
                color="primary"
            >
                Login
            </Button>
            </form>
        </CardContent>
        </Paper>)
    }
}

LoginForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: () => { },
};

export default withStyles(styles)(reduxForm({
    form:'LoginForm',
    fields:['email','password']
})(LoginForm));
