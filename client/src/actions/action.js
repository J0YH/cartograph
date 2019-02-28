import jwtDecode from 'jwt-decode';

export const REQUEST_GOALS = 'REQUEST_GOALS';
export const REQUEST_GOALS_SUCCESS = 'REQUEST_GOALS_SUCCESS';
export const REQUEST_GOALS_FAIL = 'REQUEST_GOALS_FAIL';
export const REQUEST_GOAL = 'REQUEST_GOAL';
export const REQUEST_GOAL_SUCCESS = 'REQUEST_GOAL_SUCCESS';
export const REQUEST_GOAL_FAIL = 'REQUEST_GOAL_FAIL';
export const REQUEST_ACCOMPLISHMENTS = 'REQUEST_ACCOMPLISHMENTS';
export const REQUEST_ACCOMPLISHMENTS_SUCCESS = 'REQUEST_ACCOMPLISHMENTS_SUCCESS';
export const REQUEST_ACCOMPLISHMENTS_FAIL = 'REQUEST_ACCOMPLISHMENTS_FAIL';
export const REQUEST_COMPLETE_ACTION = 'REQUEST_COMPLETE_ACTION';
export const REQUEST_COMPLETE_ACTION_SUCCESS = 'REQUEST_COMPLETE_ACTION_SUCCESS';
export const REQUEST_COMPLETE_ACTION_FAIL = 'REQUEST_COMPLETE_ACTION_FAIL';
export const REQUEST_STRATEGIES = 'REQUEST_STRATEGIES';
export const REQUEST_STRATEGIES_SUCCESS = 'REQUEST_STRATEGIES_SUCCESS';
export const REQUEST_STRATEGIES_FAIL = 'REQUEST_STRATEGIES_FAIL';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REQUEST_ALL_USERS = 'REQUEST_ALL_USERS';
export const REQUEST_ALL_USERS_SUCCESS = 'REQUEST_ALL_USERS_SUCCESS';
export const REQUEST_ALL_USERS_FAIL = 'REQUEST_ALL_USERS_FAIL';
export const REQUEST_ALL_STRATEGIES = 'REQUEST_ALL_STRATEGIES';
export const REQUEST_ALL_STRATEGIES_SUCCESS = 'REQUEST_ALL_STRATEGIES_SUCCESS';
export const REQUEST_ALL_STRATEGIES_FAIL = 'REQUEST_ALL_STRATEGIES_FAIL';
export const REQUEST_RATE_STRATEGY = 'REQUEST_RATE_STRATEGY';
export const REQUEST_RATE_STRATEGY_SUCCESS = 'REQUEST_RATE_STRATEGY_SUCCESS';
export const REQUEST_RATE_STRATEGY_FAIL = 'REQUEST_RATE_STRATEGY_FAIL';
export const REQUEST_EDIT_GOAL = 'REQUEST_EDIT_GOAL';
export const REQUEST_EDIT_GOAL_SUCCESS = 'REQUEST_EDIT_GOAL_SUCCESS';
export const REQUEST_EDIT_GOAL_FAIL = 'REQUEST_EDIT_GOAL_FAIL';
export const REQUEST_EDIT_ACTION = 'REQUEST_EDIT_ACTION';
export const REQUEST_EDIT_ACTION_SUCCESS = 'REQUEST_EDIT_ACTION_SUCCESS';
export const REQUEST_EDIT_ACTION_FAIL = 'REQUEST_EDIT_ACTION_FAIL';
export const REQUEST_ADD_GOAL = 'REQUEST_ADD_GOAL';
export const REQUEST_ADD_GOAL_SUCCESS = 'REQUEST_ADD_GOAL_SUCCESS';
export const REQUEST_ADD_GOAL_FAIL = 'REQUEST_ADD_GOAL_FAIL';
export const REQUEST_ADD_STRATEGY = 'REQUEST_ADD_STRATEGY';
export const REQUEST_ADD_STRATEGY_SUCCESS = 'REQUEST_ADD_STRATEGY_SUCCESS';
export const REQUEST_ADD_STRATEGY_FAIL = 'REQUEST_ADD_STRATEGY_FAIL';
export const REQUEST_DELETE_STRATEGY = 'REQUEST_DELETE_STRATEGY';
export const REQUEST_DELETE_STRATEGY_SUCCESS = 'REQUEST_DELETE_STRATEGY_SUCCESS';
export const REQUEST_DELETE_STRATEGY_FAIL = 'REQUEST_DELETE_STRATEGY_FAIL';
export const REQUEST_EDIT_ACCOMPLISHMENT = 'REQUEST_EDIT_ACCOMPLISHMENT';
export const REQUEST_EDIT_ACCOMPLISHMENT_SUCCESS = 'REQUEST_EDIT_ACCOMPLISHMENT_SUCCESS';
export const REQUEST_EDIT_ACCOMPLISHMENT_FAIL = 'REQUEST_EDIT_ACCOMPLISHMENT_FAIL';
export const REQUEST_ADD_ACCOMPLISHMENT = 'REQUEST_ADD_ACCOMPLISHMENT';
export const REQUEST_ADD_ACCOMPLISHMENT_SUCCESS = 'REQUEST_ADD_ACCOMPLISHMENT_SUCCESS';
export const REQUEST_ADD_ACCOMPLISHMENT_FAIL = 'REQUEST_ADD_ACCOMPLISHMENT_FAIL';
export const REQUEST_EDIT_USER = 'REQUEST_EDIT_USER';
export const REQUEST_EDIT_USER_SUCCESS = 'REQUEST_EDIT_USER_SUCCESS';
export const REQUEST_EDIT_USER_FAIL = 'REQUEST_EDIT_USER_FAIL';
export const REQUEST_USER = 'REQUEST_USER';
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS';
export const REQUEST_USER_FAIL = 'REQUEST_USER_FAIL';
export const REQUEST_DELETE_ACCOMPLISHMENT = 'REQUEST_DELETE_ACCOMPLISHMENT';
export const REQUEST_DELETE_ACCOMPLISHMENT_SUCCESS = 'REQUEST_DELETE_ACCOMPLISHMENT_SUCCESS';
export const REQUEST_DELETE_ACCOMPLISHMENT_FAIL = 'REQUEST_DELETE_ACCOMPLISHMENT_FAIL';
export const REQUEST_ADD_ACTION = 'REQUEST_ADD_ACTION';
export const REQUEST_ADD_ACTION_SUCCESS = 'REQUEST_ADD_ACTION_SUCCESS';
export const REQUEST_ADD_ACTION_FAIL = 'REQUEST_ADD_ACTION_FAIL';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const REQUEST_CATEGORIES_SUCCESS = 'REQUEST_CATEGORIES_SUCCESS';
export const REQUEST_CATEGORIES_FAIL = 'REQUEST_CATEGORIES_FAIL';
export const REQUEST_DELETE_ACTION = 'REQUEST_DELETE_ACTION';
export const REQUEST_DELETE_ACTION_SUCCESS = 'REQUEST_DELETE_ACTION_SUCCESS';
export const REQUEST_DELETE_ACTION_FAIL = 'REQUEST_DELETE_ACTION_FAIL';
export const REQUEST_INDUSTRIES = 'REQUEST_INDUSTRIES';
export const REQUEST_INDUSTRIES_SUCCESS = 'REQUEST_INDUSTRIES_SUCCESS';
export const REQUEST_INDUSTRIES_FAIL = 'REQUEST_INDUSTRIES_FAIL';
export const LOGOUT = 'LOGOUT';

// LOGIN
export const login = (username, password) => dispatch => {
	dispatch({
		type: LOGIN,
	});
	fetch('/login', {
		method: 'POST',
		body: JSON.stringify({username, password}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(res => res.json())
	.then(data => {
		dispatch({
			type: LOGIN_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: LOGIN_FAIL,
			err,
		});
	});
}

// LOGOUT
 export const logout = () => dispatch => {
	dispatch({
		type: LOGOUT,
	});
}

// USERS
export const editUser = (reqObj) => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	
	dispatch({
		type: REQUEST_EDIT_USER
	});
	fetch(`/users/${decodedToken.user._id}`, {
		method: 'PUT',
		body: JSON.stringify(reqObj),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_EDIT_USER_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_EDIT_USER_FAIL,
			err,
		});
	});
}

export const getUser = (id) => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	
	dispatch({
		type: REQUEST_USER
	});
	fetch(`/users/${decodedToken.user._id}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_USER_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_USER_FAIL,
			err,
		});
	});
}


// not currently in play - useful for admin view possibly in future
export const getAllUsers = () => (dispatch, getState) => {
	dispatch({
		type: REQUEST_ALL_USERS
	});
	fetch('/users')
	.then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_ALL_USERS_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_ALL_USERS_FAIL,
			err
		})
	})
};

// GOALS
export const getGoals = () => (dispatch, getState)  => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	dispatch({
		type: REQUEST_GOALS
	});
	fetch(`/users/${decodedToken.user._id}/goals`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_GOALS_SUCCESS,
			data,
		})
	}).catch(err => {
		dispatch({
			type: REQUEST_GOALS_FAIL,
			err,
		})
	})
};

export const editGoal = (goalId, editObj) => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	dispatch({
		type: REQUEST_EDIT_GOAL
	});
	fetch(`/goals/${goalId}`, {
		method: 'PUT',
		body: JSON.stringify(editObj),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_EDIT_GOAL_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_EDIT_GOAL_FAIL,
			err,
		});
	});
}

//may be a superfluous/old action - consider deleting later
export const getGoal = (id) => dispatch => {
	dispatch({
		type: REQUEST_GOAL
	});
	fetch(`/goals/${id}`)
	.then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_GOAL_SUCCESS,
			data,
		})
	}).catch(err => {
		dispatch({
			type: REQUEST_GOAL_FAIL,
			err,
		})
	})
};


export const getAllStrategies = () => dispatch => {
	dispatch({
		type: REQUEST_ALL_STRATEGIES
	});
	fetch('/strategies')
	.then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_ALL_STRATEGIES_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_ALL_STRATEGIES_FAIL,
			err
		})
	})
};



export const completeAction = (id) => (dispatch, getState) => {
	const authToken = getState().account.token;

	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1;
	const yyyy = today.getFullYear();
	if(dd<10) {
	    dd = '0'+dd
	} 
	if(mm<10) {
	    mm = '0'+mm
	} 
	today = yyyy + '/' + mm + '/' + dd;

	dispatch({
		type: REQUEST_COMPLETE_ACTION,	
	});
	fetch(`/actions/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			completedDate: today
		}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
	})
	.then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_COMPLETE_ACTION_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_COMPLETE_ACTION_FAIL,
			err,
		});
	})
};

export const getAccomplishments = () => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	dispatch({
		type: REQUEST_ACCOMPLISHMENTS,
	});
	fetch(`/users/${decodedToken.user._id}/accomplishments`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	}).then(res => {
		return res.json();
	}).then(data => {
		dispatch({
			type: REQUEST_ACCOMPLISHMENTS_SUCCESS,
			data
		})
	}).catch(err => {
		dispatch({
			type: REQUEST_ACCOMPLISHMENTS_FAIL,
			err
		})
	})
};

export const getStrategies = () => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	dispatch({
		type: REQUEST_STRATEGIES,
	});
	fetch(`/users/${decodedToken.user._id}/strategies`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
	.then(res => {
		return res.json();
	}).then(data => {
		dispatch({
			type: REQUEST_STRATEGIES_SUCCESS,
			data
		})
	}).catch(err => {
		dispatch({
			type: REQUEST_STRATEGIES_FAIL,
			err
		})
	})
};

export const rateStrategy = (strategyId, ratingObj) => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	dispatch({
		type: REQUEST_RATE_STRATEGY
	});
	fetch(`/users/${decodedToken.user._id}/strategies/${strategyId}/ratings`, {

		method: 'POST',
		body: JSON.stringify(ratingObj),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_RATE_STRATEGY_SUCCESS,
			data,
			strategyId,
			ratingObj,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_RATE_STRATEGY_FAIL,
			err,
		});
	});
}



export const editAction = (id, reqObj) => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	dispatch({
		type: REQUEST_EDIT_ACTION
	});
	fetch(`/actions/${id}`, {
		method: 'PUT',
		body: JSON.stringify(reqObj),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_EDIT_ACTION_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_EDIT_ACTION_FAIL,
			err,
		});
	});
}

export const addGoal = (reqObj) => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	reqObj.user = decodedToken.user._id;
	dispatch({
		type: REQUEST_ADD_GOAL
	});
	fetch(`/users/${decodedToken.user._id}/goals`, {
		method: 'POST',
		body: JSON.stringify(reqObj),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_ADD_GOAL_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_ADD_GOAL_FAIL,
			err,
		});
	});
}

export const addStrategy = (reqObj) => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);

	dispatch({
		type: REQUEST_ADD_STRATEGY
	});
	fetch(`/users/${decodedToken.user._id}/strategies`, {
		method: 'POST',
		body: JSON.stringify(reqObj),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_ADD_STRATEGY_SUCCESS,
			data
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_ADD_STRATEGY_FAIL,
			err,
		});
	});
}

export const deleteStrategy = (id) => (dispatch, getState) => {
	
const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	dispatch({
		type: REQUEST_DELETE_STRATEGY
	});
	fetch(`/users/${decodedToken.user._id}/strategies/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_DELETE_STRATEGY_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_DELETE_STRATEGY_FAIL,
			err,
		});
	});
}

export const editAccomplishment = (id, reqObj) => (dispatch, getState) => {
	const authToken = getState().account.token;
	
	dispatch({
		type: REQUEST_EDIT_ACCOMPLISHMENT
	});
	fetch(`/accomplishments/${id}`, {

		method: 'PUT',
		body: JSON.stringify(reqObj),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_EDIT_ACCOMPLISHMENT_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_EDIT_ACCOMPLISHMENT_FAIL,
			err,
		});
	});
}

export const addAccomplishment = (reqObj) => (dispatch, getState) => {
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	reqObj.user = decodedToken.user._id;
	dispatch({
		type: REQUEST_ADD_ACCOMPLISHMENT
	});
	fetch(`/users/${decodedToken.user._id}/accomplishments`, {
		method: 'POST',
		body: JSON.stringify(reqObj),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_ADD_ACCOMPLISHMENT_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_ADD_ACCOMPLISHMENT_FAIL,
			err,
		});
	});
}


export const deleteAccomplishment = (id) => (dispatch, getState) => {
	const authToken = getState().account.token;

	dispatch({
		type: REQUEST_DELETE_ACCOMPLISHMENT
	});
	fetch(`/accomplishments/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_DELETE_ACCOMPLISHMENT_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_DELETE_ACCOMPLISHMENT_FAIL,
			err,
		});
	});
}

// add action to existing goal
export const addAction = (id, reqObj) => (dispatch, getState) => {
	const authToken = getState().account.token;
	dispatch({
		type: REQUEST_ADD_ACTION
	});
	fetch(`/goals/${id}/actions`, {
		method: 'POST',
		body: JSON.stringify(reqObj),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json();
	}).then(data => {
		dispatch({
			type: REQUEST_ADD_ACTION_SUCCESS,
			data,
		});
	}).catch(err => {
		dispatch({
			type: REQUEST_ADD_ACTION_FAIL,
			err,
		});
	});
}

export const getCategories = () => dispatch => {
	dispatch({
		type: REQUEST_CATEGORIES
	});
	fetch('/categories', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
	.then(res => {
		return res.json();
	}).then(data => {
		dispatch({
			type: REQUEST_CATEGORIES_SUCCESS,
			data,
		});
	}).then(err => {
		dispatch({
			type: REQUEST_CATEGORIES_FAIL,
			err,
		});
	});
}

export const deleteAction = (id) => (dispatch, getState) => {	
	const authToken = getState().account.token;
	const decodedToken = jwtDecode(authToken);
	dispatch({
		type: REQUEST_DELETE_ACTION
	});
	fetch(`/actions/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
	}).then(res => {
		return res.json()
	}).then(data => {
		dispatch({
			type: REQUEST_DELETE_ACTION_SUCCESS,
			data
		});		
	}).catch(err => {
		dispatch({
			type: REQUEST_DELETE_ACTION_FAIL,
			err
		});
	});
}

export const getIndustries = () => dispatch => {
	dispatch({
		type: REQUEST_INDUSTRIES
	});
	fetch('/industries', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
	.then(res => {
		return res.json();
	}).then(data => {
		dispatch({
			type: REQUEST_INDUSTRIES_SUCCESS,
			data,
		});
	}).then(err => {
		dispatch({
			type: REQUEST_INDUSTRIES_FAIL,
			err,
		});
	});
}
