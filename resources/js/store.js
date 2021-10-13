

import { createStore,  combineReducers, applyMiddleware } from "redux";
import { reducer  } from "redux-form";
import reduxThunk from 'redux-thunk';
//import userReducer from "./redux/reducers/users";
import { authentication } from './redux/reducers/authentication';
import { users } from './redux/reducers/users';
import { user } from './redux/reducers/user';
import { parent } from './redux/reducers/parent';
import { alert } from './redux/reducers/alert';
import logger from 'redux-logger'

const rootReducer = combineReducers({
  authentication,
  users,
  auth:user,
  parent,
  alert,
  form: reducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk, logger));
/*
const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk, ReduxPromise));

const createStoreWithMiddleWare = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleWare(rootReducer);
*/

export default store;
