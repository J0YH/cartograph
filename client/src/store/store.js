import { createStore, combineReducers, applyMiddleware } from 'redux';
import { appReducer } from '../reducers/appReducer';
import { accountReducer } from '../reducers/accountReducer';
import thunk from 'redux-thunk';

export default createStore(combineReducers({app: appReducer, account: accountReducer}), applyMiddleware(thunk));