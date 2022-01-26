import { userConstants } from '../constants';

const initState = {
  items:[],
  teachers:[],
  teacher:{}
}
export function users(state=initState, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
      case 'ALL-TEACHERS':
        return { 
          ...state,
          teachers: action.teachers
        };
      case 'TEACHER':
        return { 
          ...state,
          teacher: action.teacher
        };
    default:
      return state
  }
}