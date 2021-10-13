import { SHOW_USERS_LIST } from "../../redux/constants/actionTypes"

export const users = (state = [], action) => {
  switch (action.type) {
    case SHOW_USERS_LIST:
      return action.payload
    default:
      return state
  }
} 