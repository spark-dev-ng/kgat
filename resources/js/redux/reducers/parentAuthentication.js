import { parentConstants } from '../constants';

let parent = JSON.parse(localStorage.getItem('user'));
const initialState = parent ? { loggedIn: true, parent } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case parentConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loggedIn: true,
        parent: action.parent,
        log:action,
      };
    case parentConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn: false,
        parent: action.parent,
        log:action,
      };
    case parentConstants.LOGIN_FAILURE:
      return {};
    case parentConstants.LOGOUT:
      return {};
    default:
      return state
  }
}