import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { reduxForm, Field } from 'redux-form'

import { connect } from 'react-redux'
import { userActions } from '../../../../redux/actions'
import {Link} from 'react-router-dom'
import logo from '../../../../assets/images/logog.jpg'
import { 
    Button, 
    TextField,
    Paper,
    Typography,
    CardContent,
    FormHelperText,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Checkbox,
	Grid    } from '@material-ui/core'

class RegSucess extends React.Component{
    constructor(props) {
        super(props)
        console.error({ID:props.match.params.id})
         const {id} = props.match.params
         this.props.dispatch(userActions.getStudent(id));

         this.state = {
             submitted: false
         }
         console.log(this.props)
    }
 

    render(){
        const {classes, className} = this.props;
        // const {id,pob,first_name,last_name,other_name,gender,state,lga,phone,phone2,religion,occupation,email,reg_no, class_id,school_id, parent_id,session_id, profile_pix, created_at} = this.props?.student;
         const {student} = this.props
         return (
        <Paper className={className}>
            <CardContent style={{margin:'50'}}>
                <div  className={classes.logoContainer}>
                    <Link to="/">
                    <img
                        className={classes.logo}
                        src={logo}
                    />
                    </Link>
                </div>
                <Typography variant="h5" align="center">Acknowlegement form</Typography>
                {/* <Grid container spacing={0}>
					<Grid item xs={3} sm={3}>
                        <span>First name:</span>
                    </Grid>
					<Grid item xs={3} sm={3}>
                        <span>{student?.first_name}</span>
                    </Grid>
                </Grid> */}
                <img style={{with:100, height:120}} src={student?.profile_pix} alt='Picture' />
                <table>
                    <thead></thead>
                    <tr><td colSpan='6'><Typography variant="h5" align="center">Basic information:</Typography></td></tr>
                    <tr><td>First name</td><td>Last name</td><td>Other name name</td></tr>
                    <tbody>
                    <tr><td>{student?.first_name}</td><td>{student?.last_name}</td><td>{student?.other_name}</td></tr>
                    </tbody>
                </table>
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

RegSucess.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  onSubmit: PropTypes.func,
}

RegSucess.defaultProps = {
  onSubmit: () => { },
}
const mapStateToProps = (state)=> {
    let student = false
    if(state)
        student = state.auth.student
    return {
        student
    }
}
const RegSucessPage = connect(mapStateToProps)(RegSucess);

export default withStyles(styles)(RegSucessPage)
