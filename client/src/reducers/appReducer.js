import {
	REQUEST_GOALS_SUCCESS,
	REQUEST_GOAL_SUCCESS,
	REQUEST_COMPLETE_ACTION,
	REQUEST_COMPLETE_ACTION_SUCCESS,
	REQUEST_ACCOMPLISHMENTS_SUCCESS,
	REQUEST_ACCOMPLISHMENTS_FAIL,
	REQUEST_STRATEGIES_SUCCESS,
	REQUEST_STRATEGIES_FAIL,
	REQUEST_RATE_STRATEGY_SUCCESS,
	REQUEST_EDIT_GOAL_SUCCESS,
	REQUEST_EDIT_ACTION_SUCCESS,
	REQUEST_ADD_GOAL_SUCCESS,
	REQUEST_ALL_STRATEGIES_SUCCESS,
	REQUEST_ADD_STRATEGY_SUCCESS, 
	REQUEST_DELETE_STRATEGY_SUCCESS,
	REQUEST_EDIT_ACCOMPLISHMENT_SUCCESS,
	REQUEST_ADD_ACCOMPLISHMENT_SUCCESS,
	REQUEST_DELETE_ACCOMPLISHMENT_SUCCESS,
	REQUEST_ADD_ACTION_SUCCESS,
	REQUEST_CATEGORIES_SUCCESS,
	REQUEST_DELETE_ACTION_SUCCESS,
	REQUEST_INDUSTRIES_SUCCESS
} from '../actions/action';

const initialState = {
	goals: [
		{
			"_id": "0",
			"name": "i cant find mongo",
		    "description": "not mongo",
		    "actions" :[],
	    }
	],

	currentGoal: {
			"_id": "0",
			"name": "i cant find mongo",
		    "description": "not mongo",
		    "actions" :[],
	},

	strategies: [
	    {
	    	"rating": [],
	        "_id": "0",
	        "strategy": {
	        	"_id": "0",
	        	"name": "i cant find mongo",
		        "description": "not mongo",
		        "source": "not mongo"
	        },
	        
    	},
	],

	currentStrategy: {
		"rating": [],
	    "_id": "0",
	    "strategy": {
	    	"_id": "0",
	    	"name": "i cant find mongo",
	        "description": "not mongo",
	        "source": "not mongo"
	    },        
    }, 

	allStrategies: [
		{
			"_id": "0",
	        "name": "i cant find mongo",
	        "description": "not mongo",
	        "source": "not mongo"
		},
	],

	accomplishments: [
		{
		    "_id": "0",
		    "name": "i cant find mongo",
		    "description": "not mongo",
		    "user": "",
		    "category": "",
		    "completedDate": "",
		    "__v": 0
		},
	],

	currentAccomplishment: {
	    "_id": "0",
	    "name": "i cant find mongo",
	    "description": "not mongo",
	    "user": "",
	    "category": "",
	    "completedDate": "",
	    "__v": 0
	},

}

export const appReducer = (state = initialState, action) => {
	switch(action.type) {
		// good
		case REQUEST_GOALS_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				goals: action.data,
			});
		// ? ok to store just one goal?
		case REQUEST_GOAL_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				currentGoal: action.data,
			});
		// good
		case REQUEST_COMPLETE_ACTION:
			return Object.assign({}, state, {
				loading: true,
			});

		// good
		case REQUEST_COMPLETE_ACTION_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				goals: state.goals.map(goal => {
					if (goal._id === action.data._id) {
						return action.data;
					} else {
						return goal;
					}
				})
			});

		// good		
		case REQUEST_ACCOMPLISHMENTS_SUCCESS:
			return Object.assign({}, state, {
				accomplishments: action.data,
			});

		// good
		case REQUEST_STRATEGIES_SUCCESS:
			return Object.assign({}, state, {
				strategies: action.data,
			});

		// good for now - need to optimize serverside to send just updated strategy
		case REQUEST_RATE_STRATEGY_SUCCESS:
			return Object.assign({}, state, {
				strategies: action.data,
			});

		// good
		case REQUEST_EDIT_GOAL_SUCCESS:
			return Object.assign({}, state, {
				goals: state.goals.map(goal => {
					if (goal._id === action.data._id) {
						return action.data;
					} else {
						return goal;
					}
				})
			});

		// good for now - need to optimize serverside to send just updated action?
		// tricky: when updating action, server actually deletes and recreates, so action id changes
		case REQUEST_EDIT_ACTION_SUCCESS:
			return Object.assign({}, state, {
				goals: state.goals.map(goal => {
					if (goal._id === action.data._id) {
						return action.data;
					} else {
						return goal;
					}
				})
			});

		// good
		case REQUEST_ADD_GOAL_SUCCESS:
			return Object.assign({}, state, {
				goals: [...state.goals, action.data],
			});

		// good
		case REQUEST_ALL_STRATEGIES_SUCCESS:
			return Object.assign({}, state, {
				allStrategies: action.data,
			});

		// same serverside efficiency issue - getting all strategies back
		// reducer right now is correct but rendering in react code (EditorStrategies) is faulty
		case REQUEST_ADD_STRATEGY_SUCCESS:
			return Object.assign({}, state, {
				strategies: action.data,
			});

		// same serverside efficiency issue - getting all strategies back
		// same as request_add_strategy_success -
		// 	reducer right now is correct but rendering in react code (EditorStrategies) is faulty
		case REQUEST_DELETE_STRATEGY_SUCCESS:
			return Object.assign({}, state, {
				strategies: action.data,
			});


		// good
		case REQUEST_EDIT_ACCOMPLISHMENT_SUCCESS:
			return Object.assign({}, state, {
				accomplishments: state.accomplishments.map(accomplishment => {
					if (accomplishment._id === action.data._id) {
						return action.data;
					} else {
						return accomplishment;
					}
				})
			});

		// good		
		case REQUEST_ADD_ACCOMPLISHMENT_SUCCESS:
			return Object.assign({}, state, {
				accomplishments: [...state.accomplishments, action.data],
			});

		case REQUEST_DELETE_ACCOMPLISHMENT_SUCCESS:
			return Object.assign({}, state, {
				accomplishments: state.accomplishments.filter(accomplishment =>
					accomplishment._id !== action.data._id
				)
			});

		case REQUEST_ADD_ACTION_SUCCESS:
			return Object.assign({}, state, {
				goals: state.goals.map(goal => {
					if (goal._id === action.data._id) {
						return action.data;
					} else {
						return goal;
					}
				})
			});

		case REQUEST_CATEGORIES_SUCCESS:
			return Object.assign({}, state, {
				categories: action.data,
			});

		case REQUEST_INDUSTRIES_SUCCESS:
			return Object.assign({}, state, {
				industries: action.data,
			});

		case REQUEST_DELETE_ACTION_SUCCESS:
			return Object.assign({}, state, {
				goals: state.goals.map(goal => {
					if (goal._id === action.data._id) {
						return action.data;
					} else {
						return goal;
					}
				})
			});

		default: return state;
	}

}
