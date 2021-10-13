import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import asyncLoginValidate from './asyncLoginValidate'
import { reduxForm, Field } from 'redux-form'

import { connect } from 'react-redux'
import { userActions } from '../../../../redux/actions'

import logo from '../../../../assets/images/logog.jpg'

import {
	Button,
	TextField,
	Paper,
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
	Grid
} from '@material-ui/core';

class LoginForm extends React.Component {
	constructor(props) {
		super(props)

		// reset login status
		this.props.dispatch(userActions.logout());

		this.state = {
			submitted: false
		}
		console.log(this.props)
	}

	static validate(values) {
		const errors = {}
		const requiredFields = [
			'name',
			'gender',
			'address',
			'state',
			'lga',
			'phone',
			'occupation',
			'email',
			'password',
			'c_password'
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
		if (
			values.password && values.c_password &&
			(values.password !== values.c_password)
		) {
			errors.c_password = 'Passwword not match'
		}
		return errors
	}

	renderTextField({ label, input, meta: { touched, invalid, error }, ...custom }) {
		return (
			<FormControl>
				<TextField
					label={label}
					placeholder={label}
					margin="normal"
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
						margin="normal"
						style={{ width: '10' }}
						error={touched && invalid}
						helperText={touched && error}
						{...input}
						{...custom}
					/>
				}
				label={label}
			/>);
	}
	handleLoginSubmit(props) {
		this.setState({ submitted: true })
		const { password, c_password } = props
		if (c_password && password) {
			this.props.dispatch(userActions.registerParent(this.props));
		}
	}


	genderSelector({ label, input, meta: { touched, invalid, error }, ...custom }) {
		return (
			<FormControl>
				<FormLabel>&nbsp;</FormLabel>
				<NativeSelect
					margin='normal'
					style={{ width: '100%' }}
					error={touched && invalid}
					helperText={touched && error}
					{...input}
					{...custom}
				>
					<option value="">
						Select gender
					</option>
					<option value="female" control={<Radio />} label="Female" />
					<option value="male" control={<Radio />} label="Male" />
					<option value="other" control={<Radio />} label="Other" />
					<FormHelperText>Select gender</FormHelperText>
				</NativeSelect>
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
			{ name: 'first_name', label: 'First name', type: 'text' },
			{ name: 'last_name', label: 'Last name', type: 'text' },
			{ name: 'other_name', label: 'Other name', type: 'text' },
			{ name: 'gender', label: 'Gender', type: 'select' },
			{ name: 'dob', label: 'Date of birth', type: 'text' },
			{ name: 'pob', label: 'Place of birth', type: 'text' },
			{ name: 'pname', label: 'Guardian name', type: 'text' },
			{ name: 'address', label: 'Address', type: 'text' },
			{ name: 'phone', label: 'Primary phone', type: 'text' },
			{ name: 'phone2', label: 'Alternative phone', type: 'text' },
			{ name: 'email', label: 'Guardian Email', type: 'text' },
			{ name: 'religion', label: 'Religion', type: 'text' },
			{ name: 'occupation', label: 'Occupation', type: 'text' },
			{ name: 'terms', label: 'I agree with Terms', type: 'checkbox' },
			{ name: 'password', label: 'Password', type: 'password' },
			{ name: 'c_password', label: 'Confirm password', type: 'password' },

		]
		const { handleSubmit, pristine, reset, className, submitting, classes, loggingIn, user } = this.props
		return (
			<Paper className={className}>
				<CardContent>
					<div className={classes.logoContainer}>
						<img
							className={classes.logo}
							src={logo}
						/>
					</div>
					<Typography variant="h5" align="center">{user} Registration</Typography>
					<Typography variant="subtitle2" color="secondary" align="center">{this.state.loginError}</Typography>
					<form className={classes.form} onSubmit={handleSubmit(this.handleLoginSubmit.bind(this))}>
						<Grid container spacing={0}>
							{fields.map(field =>
								field.type === 'select' ? (
									<Grid item xs={12} sm={6}>
										<Field name={field.name} component={this.genderSelector} label={field.label}
											helper={this.renderFormHelper}
										/>
									</Grid>) : field.type === 'password' ?
									(
										<Grid item xs={12} sm={6}>
											<Field name={field.name} component={this.renderTextField} type="password" password="true" label={field.label} />
										</Grid>)
									: field.type === 'checkbox' ? (
										<Grid item xs={12} sm={6}>
											<Field name={field.name} component={this.renderCheckbox}
												label={field.label} />
										</Grid>
									) :
										(
											<Grid item xs={12} sm={6}>
												<Field name={field.name} component={this.renderTextField} label={field.label} />
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

LoginForm.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string),
	className: PropTypes.string,
	onSubmit: PropTypes.func,
}

LoginForm.defaultProps = {
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
const connectedLoginPage = connect(mapStateToProps)(LoginForm);

export default withStyles(styles)(reduxForm({
	form: 'LoginForm',
	fields: [
		'dob',
		'pob',
		'first_name',
		'last_name',
		'gender',
		'address',
		'pname',
		'state',
		'lga',
		'phone',
		'lga',
		'occupation',
		'email',
		'password',
		'c_password'],
	validate: LoginForm.validate,
	asyncLoginValidate
})(connectedLoginPage));
