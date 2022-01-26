import { userConstants } from '../constants';
//localStorage.removeItem('user');
// let user = JSON.parse(localStorage.getItem('user'));
const initialState =  { loggedIn: true, user:{} };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loggedIn: true,
        user: action.user,
        log:action,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        user: action.user,
        log:action,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state};
    case userConstants.LOGOUT:
      return {
        ...state,};
    default:
      return state
  }
}