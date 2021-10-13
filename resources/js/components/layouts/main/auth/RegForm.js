import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import asyncLoginValidate from './asyncLoginValidate'
import { reduxForm, Field } from 'redux-form'
import logo from '../../../../images/logo.png'
import {
	Button,
	TextField,
	Paper,
	Typography,
	CardContent,
	InputLabel,
	FormHelperText,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	Avatar,
	Checkbox
} from '@material-ui/core'

class LoginForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '', setEmail: '', password: '', setPassword: '',
		}
	}
	static validate(values) {
		const errors = {}
		const requiredFields = [
			'firstName',
			'lastName',
			'email',
			'favoriteColor',
			'notes'
		]
		requiredFields.forEach(field => {
			if (!values[field]) {
				errors[field] = 'Required'
			}
		})
		if (
			values.email &&
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		) {
			errors.email = 'Invalid email address'
		}
		return errors
	}

	renderTextField({ label, input, meta: { touched, invalid, error }, ...custom }) {
		return (
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
		)
	}


	renderCheckbox({ input, label }) {
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
	handleLoginSubmit(props) {
		console.log(props)
	}

	radioButton({ input, ...rest }) {
		return (
			<FormControl>
				<RadioGroup {...input} {...rest}>
					<FormControlLabel value="female" control={<Radio />} label="Female" />
					<FormControlLabel value="male" control={<Radio />} label="Male" />
					<FormControlLabel value="other" control={<Radio />} label="Other" />
				</RadioGroup>
			</FormControl>)
	}

	renderFromHelper({ touched, error }) {
		if (!(touched && error)) {
			return
		} else {
			return <FormHelperText>{touched && error}</FormHelperText>
		}
	}


	render() {
		const { handleSubmit, pristine, reset, className, submitting, classes } = this.props
		return (
			<Paper className={className}>
				<CardContent>
					<Typography variant="h4" align="center">Login</Typography>
					<div>
						<Avatar
							className={classes.logo}
							src={logo}
						/>
					</div>
					<form className={classes.form} onSubmit={handleSubmit(this.handleLoginSubmit.bind(this))}>
						<div className={classes.container}>
							<Field
								name="firstName"
								component={this.renderTextField}
								label="First Name"
							/>
						</div>
						<div className={classes.container}>
							<Field name="lastName" component={this.renderTextField} label="Last Name" />
						</div>
						<div className={classes.container}>
							<Field name="email" component={this.renderTextField} label="Email" />
						</div>
						<div>
							<Field name="sex" component={this.radioButton}>
								<Radio value="male" label="male" />
								<Radio value="female" label="female" />
							</Field>
						</div>

						<div>
							<Field name="employed" component={this.renderCheckbox} label="Employed" />
						</div>
						<br />
						<div>
							<Field
								name="notes"
								component={this.renderTextField}
								label="Notes"
								multiline
								rowsMax="4"
								margin="normal"
							/>
						</div>
						<div>
							<button type="submit" disabled={pristine || submitting}>
								Submit
							</button>
							<button type="button" disabled={pristine || submitting} onClick={reset}>
								Clear Values
							</button>
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
		height: 100,
		textAlign: 'center',
		margin: '10px auto'
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
/*
export default reduxForm({
		form: 'LoginForm', // a unique identifier for this form
		validate:LoginForm.validate,
		asyncLoginValidate
	})(LoginForm)
*/
export default withStyles(styles)(reduxForm({
	form: 'LoginForm',
	fields: ['email', 'firstName', 'lastName', 'notes', 'sex'],
	validate: LoginForm.validate,
	asyncLoginValidate
})(LoginForm));
