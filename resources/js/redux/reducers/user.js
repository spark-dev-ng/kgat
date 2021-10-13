import { userConstants } from '../constants';
const init = {
  user: {},
  loading:false,
  error:null,
}
export function user(state = init, action) {
  switch (action.type) {
    case userConstants.GETAUTH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETAUTH_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case userConstants.GETAUTH_FAILURE:
      return { 
        ...state,
        error: action.error,
        loading:false,
      };
    case 'GUEST-STUDENT':
    return {
        ...state,
        student:action.payload,
    }
    case 'PARENT-REGISTER':
    return {
        ...state,
        parent:action.payload,
    }
    default:
      return state
  }
}