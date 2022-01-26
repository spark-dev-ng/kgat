import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
// import asyncRegisterValidate from './asyncRegisterValidate'
import { reduxForm, Field } from 'redux-form'
import DropFile from '../../../DropLocalFile'

import { connect } from 'react-redux'
import { userActions } from '../../../../redux/actions'
import { getSchools, getClasses,getSubjects  } from '../../../../helpers'

import { URLS } from '../../../../redux/constants'

import {
	Button,
	TextField,
	Paper,
	DateField,
	Typography,
	CardContent,
	InputLabel,
	FormLabel,
	FormHelperText,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	Avatar,
	Checkbox,
	NativeSelect,
	Grid,Select,MenuItem } from '@material-ui/core';
	const requiredFields = [
		'name',
		'dob',
		'gender',
		'phone',
		'address',
		'class',
		'password',
		'c_password'
	]
class RegisterForm extends React.Component {
	constructor(props) {
		super(props)

		// reset Register status
		this.props.dispatch(userActions.logout());

		this.state = {
			submitted: false,
      selected:null,
			subjects:[],
			classes:[]
		}
		console.log(this.props)
	}
	renderMSelect = this.renderMSelect.bind(this)
	static validate(values) {
		const errors = {}
		
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
		if (
			values.password && values.c_password &&
			(values.password !== values.c_password)
		) {
			errors.c_password = 'Passwword not match'
		}
		return errors
	}

	renderTextField({ label, input, type, meta: { touched, invalid, error }, ...custom }) {
		return type === 'date' ? (
			<FormControl style={{ marginTop: 5, borderBottom: error ? '1 solid red !important' : '1 solid black !important' }}>
				<FormHelperText>{label} {requiredFields.includes(input.name) &&'*'}</FormHelperText>
				<input type='date'
					style={{ width: '100%', border: 'none', borderBottom: '1 solid black' }}
					{...input}
					{...custom}
				/>
				{touched && error && error && (<span style={{ color: 'red' }}>{error}</span>)}
			</FormControl>
		)
			: (
				<FormControl>
					<TextField
						label={label}
						placeholder={label}
						margin='dense'
						type={type}
						style={{ width: '100%' }}
						error={touched && invalid}
						helperText={touched && error}
						{...input}
						{...custom}
					/>
				</FormControl>
			)
	}

	renderCheckbox({ label, input, meta: { touched, invalid, error }, ...custom }) {
		return (
			<FormControlLabel
				control={
					<Checkbox
						checked={input.value ? true : false}
						onChange={input.onChange}
						margin="dense"
						style={{ width: '10' }}
						error={touched && invalid}
						helperText={touched && error}
						{...input}
						{...custom}
					/>
				}
				label={`${label}` + requiredFields.includes(input.name) && '*'}
			/>);
	}

	handleRegSubmit(props) {
		this.setState({ submitted: true })
		console.error(props)
		const { password } = props
		props.type = 'Teacher';
		props.profile_pic = sessionStorage.getItem('profile_pic');
		props.classes = this.state.classes.toString()
		props.subjects = this.state.subjects.toString()
		// console.error({props,classes:this.state.classes, GET_CLS:getClasses()})
		if (password && props.profile_pic) {
			this.props.dispatch(userActions.register(props));
		}
	}

	renderSelect({ label, input, options, multy=false, meta: { touched, invalid, error }, ...custom }) {
		return (
			<FormControl>
				<FormHelperText>{label}  {requiredFields.includes(input.name) &&'*'}</FormHelperText>
				<NativeSelect
					margin='dense'
					style={{ }}
					error={touched && invalid}
					helperText={touched && error}
					{...input}
					{...custom}
					fullWidth
				>
					<option value="">
						{label}
					</option>
					{options.map((item, i) => (<option value={item} key={i}>{item}</option>))}

				</NativeSelect>
				{custom.helper({ touched, error })}
			</FormControl>)
	}
  renderMSelect({ label, input, options, multy=false, meta: { touched, invalid, error }, ...custom }) {
		const [values,setValues] = React.useState([])
    return (
			<FormControl>
				<FormHelperText style={{fontSize:13}}>{label} {requiredFields.includes(input.name) &&'*'}</FormHelperText>
				<Select
          name={input.name}
          value={values}
          multiple={true}
					style={{color:'black', width:'15vw' }}
					fullWidth
          onChange={({target})=>{setValues(target.value);
						this.setState({...this.state,[input.name]:values})}}
				>
					
          {options.map((item,i)=>
          (<MenuItem 
            style={{color:values.includes(item)?'green':'black'}}
            key={i} value={item}>{item}</MenuItem>))
				}
				</Select>
				{custom.helper({ touched, error })}
			</FormControl>)
	}

	renderFormHelper({ touched, error }) {
		if (!(touched && error)) {
			return
		} else {
			return <FormHelperText style={{ color: 'red' }}>{touched && error}</FormHelperText>
		}
	}

	render() {
		const fields = [
      { name: 'name', label: 'Full name *', type: 'text' },
      { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
      { name: 'dob', label: 'Date of birth', type: 'date' },
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'phone', label: 'Primary phone *', type: 'text' },
      { name: 'phone2', label: 'Alternative phone', type: 'text' },
      { name: 'email', label: 'Email address', type: 'text' },
      {
        name: 'class', label: 'Form master class ', type: 'select',
        options: getClasses().map(c => c.name)
      },
      {
        name: 'classes', label: 'Other classes', type: 'multiselect',
        options: getClasses().map(c => c.name)
      },{
        name: 'subjects', label: 'Subjects', type: 'multiselect',
        options: getSubjects().map(c => c.name)
      },
      { name: 'password', label: 'Password', type: 'password' },
      { name: 'c_password', label: 'Confirm password', type: 'password' },
    ]
		const { handleSubmit, pristine, reset, className, submitting, classes, loggingIn, user } = this.props
		return (
			<Paper className={className} style={{ paddingLeft: 60 }}>
				<CardContent>
					<div className={classes.logoContainer}>
						<img
							className={classes.logo}
							src={`${URLS.INIT}/images/logog.jpg`}
						/>
					</div>
					<Typography variant="h5" align="center">{user} Registration</Typography>
					<Typography variant="subtitle2" color="secondary" align="center">{this.state.RegisterError}</Typography>
					<form className={classes.form} onSubmit={handleSubmit(this.handleRegSubmit.bind(this))}>
						<Grid item xs={12} sm={12} lg={12} md={12} style={{ width: '100%' }}>
							<DropFile style={{ width: '100%' }} />
						</Grid>
						<Grid container spacing={0}>
							{fields.map((field, i) =>
              	field.type === 'multiselect' ? (
									<Grid key={i} item xs={12} sm={6}>
										<Field name={field.name} component={this.renderMSelect} label={field.label}
											helper={this.renderFormHelper}
											options={field.options}
										/>
									</Grid>):
								field.type === 'select' ? (
									<Grid key={i} item xs={12} sm={6}>
										<Field name={field.name} component={this.renderSelect} label={field.label}
											helper={this.renderFormHelper}
											options={field.options}
										/>
									</Grid>) : field.type === 'password' ?
									(
										<Grid key={i} item xs={12} sm={6}>
											<Field name={field.name} component={this.renderTextField} type="password" password="true" label={field.label} />
										</Grid>)
									: field.type === 'checkbox' ? (
										<Grid key={i} item xs={12} sm={6}>
											<Field name={field.name} component={this.renderCheckbox}
												label={field.label} />
										</Grid>
									) :
										(
											<Grid key={i} item xs={12} sm={6}>
												<Field name={field.name} component={this.renderTextField} type={field.type} label={field.label} />
											</Grid>
										)
							)}
							<div>

								<Button
									variant="contained"
									type="submit"
									size='small'
									color='primary'
									disabled={pristine || submitting}>
									Submit
								</Button>
								<Button size='small' className={classes.clearBtn} color='secondary' type="button" disabled={pristine || submitting} onClick={reset}>
									Reset form
								</Button>
							</div>
						</Grid>
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
		height: 100
	},
	logoContainer: {
		textAlign: 'center',
	},
	clearBtn: {
		float: 'right',
	}
})

RegisterForm.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string),
	className: PropTypes.string,
	onSubmit: PropTypes.func,
}

RegisterForm.defaultProps = {
	onSubmit: () => { },
}
const mapStateToProps = (state) => {
	let loggingIn = false
	if (state)
		loggingIn = state.authentication

	return {
		loggingIn
	}
}
const connectedRegisterPage = connect(mapStateToProps)(RegisterForm);

export default withStyles(styles)(reduxForm({
	form: 'TearcherRegisterForm',
	fields: [
		'name',
		'gender',
		'dob',
		'address',
		'phone',
		'phone2',
		'subjects',
		'class',
		'classes',
		'religion',
		'email',
		'password',
		'c_password'],
	validate: RegisterForm.validate,
})(connectedRegisterPage));
