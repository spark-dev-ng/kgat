import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { users } from './users';
import { user } from './user';
import { alert } from './alert';

const rootReducer = combineReducers({
  authentication,
  users,
  auth:user,
  alert
});

export default rootReducer;