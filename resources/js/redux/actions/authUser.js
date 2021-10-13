import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './index';
import { history } from '../../helpers';

export const userActions = {
	register,
	login,
	logout,
	getAuth,
	getAll,
	getStudent,
	registerParent,
};

function login(username, password) {
	return dispatch => {
		dispatch(request({ username }));

		userService.login(username, password)
			.then(
				user => {
					dispatch(success(user));
					history.push('/dashboard');
					// location = '/dashboard';
				},
			)
			.catch(error => {
				dispatch(failure(error));
				console.error({ error })
				dispatch(alertActions.error(error));
			})
	};

	function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
	function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function registerParent(data) {
	return dispatch => {
		userService.registerParent(data)
			.then(
				user => {
					dispatch(success(user));
					history.push('/dashboard');
					// location = '/dashboard';
				},
			)
			.catch(error => {
				dispatch(failure(error));
				console.error({ error })
				dispatch(alertActions.error(error));
			})
	};
	function success(user) { return { type: 'PARENT-REGISTER', payload: user } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function register(data) {
	return dispatch => {
		userService.register(data)
			.then(
				user => {
					dispatch(success(user));
					history.push('/dashboard');
					// location = '/dashboard';
				},
			)
			.catch(error => {
				dispatch(failure(error));
				console.error({ error })
				dispatch(alertActions.error(error));
			})
	};

	function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
	function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function getStudent(id){
	return dispatch => {
		userService.getStudent(id)
			.then(
				user => {
					dispatch(success(user));
					// location = '/dashboard';
				},
			)
			.catch(error => {
				dispatch(failure(error));
				console.error({ error })
				dispatch(alertActions.error(error));
			})
	};

	// function request(user) { return { type: 'GUEST-STUDENT', user } }
	function success(user) { return  { type: 'GUEST-STUDENT', payload:user.student }  } 
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}

function logout() {
	userService.logout();
	return { type: userConstants.LOGOUT };
}

function getAll() {
	return dispatch => {
		dispatch(request());

		userService.getAll()
			.then(
				users => dispatch(success(users)),
				error => dispatch(failure(error))
			);
	};

	function request() { return { type: userConstants.GETALL_REQUEST } }
	function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
	function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getAuth() {
	return dispatch => {
		dispatch(request());

		userService.getAuth()
			.then(
				user => dispatch(success(user)),
				error => dispatch(failure(error))
			);
	};

	function request() { return { type: userConstants.GETAUTH_REQUEST } }
	function success(user) { return { type: userConstants.GETAUTH_SUCCESS, user } }
	function failure(error) { return { type: userConstants.GETAUTH_FAILURE, error } }
}