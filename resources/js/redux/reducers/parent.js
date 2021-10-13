import { parentConstants } from '../constants';

export function parent(state = {}, action) {
  switch (action.type) {
    case parentConstants.GETAUTH_REQUEST:
      return {
        loading: true
      };
    case parentConstants.GETAUTH_SUCCESS:
      return { parent: action.parent };
    case parentConstants.GETAUTH_FAILURE:
      return { 
        error: action.error
      };
    case parentConstants.GETCHILD_SUCCESS:
        return { ...state, ...action.child };
    case parentConstants.GETCHILD_FAILURE:
      return { 
        error: action.error
      };
    case parentConstants.GET_SESSIONS_SUCCESS:
        return { ...state, ...action.sessions };
    case parentConstants.GET_SESSIONS__FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}