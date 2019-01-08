import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REQUEST_ALL_USERS,
	REQUEST_ALL_USERS_SUCCESS,
	REQUEST_ALL_USERS_FAIL,
	REQUEST_EDIT_USER_SUCCESS,
	REQUEST_USER_SUCCESS
	LOGOUT
} from '../actions/action';

const initialState = {
	username: 'notMongo',
	password: 'notMongo',
	firstName: 'notMongo',
	lastName: 'notMongo',
	industry: 'notMongo',
	experience: 'notMongo',
	country: 'notMongo',
	state: 'notMongo',
	city: 'notMongo',
	about:'notMongo',
};

export const accountReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				token: action.data.authToken,
			});
		case LOGOUT:
			return Object.assign({}, state, {
				token: null,
			});
		case REQUEST_ALL_USERS_SUCCESS:
			return Object.assign({}, state, {
				users: action.data,
			});
		case REQUEST_USER_SUCCESS:
			console.log("request user success reducer", action.data);
			return Object.assign({}, state, {
				user: action.data,
			});
		case REQUEST_EDIT_USER_SUCCESS:
			console.log("request edit user success reducer", action.data);
			return Object.assign({}, state, {
				user: action.data,
			});
		default: return state;
	}
	
}