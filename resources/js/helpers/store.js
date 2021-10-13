import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../redux/reducers';

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);