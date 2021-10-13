import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { reduxForm, Field } from 'redux-form'

import { connect } from 'react-redux'
import { userActions } from '../../../../redux/actions'
 
import logo from '../../../../images/logo.png'
import { Button, 
    TextField,
    Paper,
    Typography,
    CardContent,
    FormHelperText,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Checkbox    } from '@material-ui/core'

class LoginForm extends React.Component{
    constructor(props) {
        super(props)
        
         // reset login status
         this.props.dispatch(userActions.logout());

         this.state = {
             submitted: false
         }
         console.log(this.props)
    }
 
    static validate(values){
    const errors = {}
    const requiredFields = [
      'email',
      'password'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if (
      values.email && values.email.includes('@') &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    return errors
  }
  
    renderTextField({label,input, meta: { touched, invalid, error },...custom } ){
        return(
            <TextField
            label={label}
            placeholder={label}
            margin="normal"
            style={{width:'100%'}}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
            />
        )
    }
      
  
    renderCheckbox({ input, label }){
    return (<div>
            <FormControlLabel
                control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
                }
                label={label}
            />
        </div>)
    }
    handleLoginSubmit(props){
        this.setState({ submitted: true })
        const { email, password } = props
        const username = email
        if (username && password) {
            this.props.dispatch(userActions.login(username, password));
        }
    }
  
    radioButton({ input, ...rest }){
        return(
        <FormControl>
            <RadioGroup {...input} {...rest}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>)
    }
  
    renderFromHelper({ touched, error }){
        if (!(touched && error)) {
            return
        } else {
            return <FormHelperText>{touched && error}</FormHelperText>
        }
    }
    
   
    render(){
        const { handleSubmit, pristine, reset, className, submitting, classes, loggingIn, user } = this.props
        return (
        <Paper className={className}>
            <CardContent>
                <div  className={classes.logoContainer}>
                    <img
                        className={classes.logo}
                        src={logo}
                    />
                </div>
                <Typography variant="h5" align="center">{user} Login</Typography>
                <Typography variant="subtitle2" color="secondary" align="center">{this.state.loginError}</Typography>

                <form className={classes.form} onSubmit={
                    handleSubmit(this.handleLoginSubmit.bind(this))}>
                    
                    <div  className={classes.container}>
                        <Field name="email" component={this.renderTextField} label="Email or Username" />
                    </div>
                    <div  className={classes.container}>
                        <Field name="password" type="password" component={this.renderTextField} password="true" label="Password" />
                    </div>
                    <div>
                        <Field name="remember" component={this.renderCheckbox} label="Remember-Me" />
                    </div>
                   
                    <div>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            size='medium' 
                            color='primary' 
                            disabled={pristine || submitting}>
                            Login
                        </Button>
                        <Button  size='small' className={classes.clearBtn} color='secondary' type="button" disabled={pristine || submitting} onClick={reset}>
                            Clear Values
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Paper>)
    }   
}
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

LoginForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  onSubmit: PropTypes.func,
}

LoginForm.defaultProps = {
  onSubmit: () => { },
}
const mapStateToProps = (state)=> {
    let loggingIn = false
    if(state)
        loggingIn = state.authentication

    return {
        loggingIn
    }
}
const connectedLoginPage = connect(mapStateToProps)(LoginForm);

export default withStyles(styles)(reduxForm({
    form:'LoginForm',
    fields:['email','password'],
    validate:LoginForm.validate
})(connectedLoginPage));
