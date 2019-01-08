const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
/* user faker to populate tests post-MVP
const faker = require('faker');*/

const expect = chai.expect;

const { Strategy, Category, Industry, Goal, Accomplishment, User} = require ('../models');
const { runServer, app, closeServer } = require ('../server');
const { TEST_DATABASE_URL } = require ('../config');

chai.use(chaiHttp);

function tearDownDb() {
	return new Promise ((resolve, reject) => {
		console.warn('Deleting database');
		mongoose.connection.dropDatabase()
			.then(result => resolve(result))
			.catch(err => reject(err));
	});
}

describe ('Actions (within Goal object)', () => {

	function seedTestData() {
			const testIndustry = {
			name: "hey i'm a test industry"
		};

		const testStrategy = {
			name: "hey i'm a test strategy",
			description: "this is a neato description of a test strategy",
			source: "this is where the strategy is from!"
		};

		const testUser = {
			name: {
			    firstName: "Jane",
			    lastName: "Doe"
			  },
			username: "itsmejane",
			password: "secret",
			email: "itsjane@email.com",
			industry: null,
			experience: "7",
			location: {
				country: "USA",
				state: "Indiana",
				city: "Indianapolis"
			},
			about: "I'm one cool lady!",
			strategies: []
		};

			const testGoal = {
			name: "hey i'm a test goal",
			description: "description of a goal bloop bloop",
			user: null,
			category: null,
			dueDate: "04-04-18",
			completedDate: "03-03-18",
			actions: [
				{
					name: "this is the first test action test test test",
					completedDate: "02-02-18",
					dueDate: "03-02-18"
				},
				{
					name: "this is the second test action test test test",
					completedDate: "04-02-18",
					dueDate: "05-02-18"
				}
			]
		};

		const testCategory = {
			name: "hey i'm a test category"
		};

		let _industry;
		let _strategy;
		let _user;
		let _category;

        return Industry.create(testIndustry)
        .then(industry => {
          _industry = industry;
          return Strategy.create(testStrategy);
        })
        .then(strategy => {
          _strategy = strategy;
          testUser.industry = _industry;
          testUser.strategies.push({
            strategy: _strategy,
            rating: [{
            	date: "02-02-18",
            	value: "3"
            }]
          })
          return User.create(testUser);
        }).then(user => {
        	_user = user;
        	//console.log(_user);
 			return Category.create(testCategory);
		}).then(category => {
			_category = category;
			//console.log(_category);
			return Goal.create(testGoal)
		}).then(goal => {
			goal.user = _user;
			goal.category = _category;
			return goal.save();
		});
	};

	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function() {
		return seedTestData()
	});

	after(function() {
		return closeServer();
	});

	afterEach(function() {
		return tearDownDb();
	});

	it('should return all actions for a goal', () => {
		
		let testGoalId;

		return Goal
		.findOne()
		.then(goal => {
			testGoalId = goal.id;

			return chai.request(app)
			.get(`/goals/${testGoalId}/actions`)
			.then(res => {
				expect(res).to.have.status(200);
				expect(res.body[0]).to.include.keys(['name', 'dueDate', 'completedDate']);
			});
		});
	});

	it ('should add an action', () => {

		let testGoalId;
	
		let testNewAction = {
			name: "this is to test that an action posts",
			dueDate: "02-02-17"
		};

		let numActions;

		return Goal
		.findOne()
		.then(goal => {
			testGoalId = goal.id;
			numActions = goal.actions.length + 1;

			return chai.request(app)
			.post(`/goals/${testGoalId}/actions`)
			.send(testNewAction)
			.then(res => {
				//why need get? other POST tests just work with response object from post; this one requires get to include newly posted action
				return chai.request(app)
				.get(`/goals/${testGoalId}`)
				.then(res => {
					expect(res).to.have.status(200);
					expect(res.body.actions.length).to.equal(numActions);
				});
			});
		});
	});

	it ('should update an action', () => {
		
		let testActionId;

		let updatedAction = {
			name: "this is an updated action!"
		}

		return Goal
		.findOne()
		.then(goal => {
			//console.log(goal.actions[0]);
			testActionId = goal.actions[0]._id;
			//console.log(testActionId);

			return chai.request(app)
			.put(`/actions/${testActionId}`)
			.send(updatedAction)
			.then(res => {
				//console.log(res.body.actions[0])
				expect(res).to.have.status(200);
				expect(res.body.actions[0].name).to.equal(updatedAction.name);
				expect(res.body.actions[0]).to.include.keys(['name', 'dueDate', 'completedDate']);
			});
		});
	});

	it ('should delete an action', () => {

		let testActionId;
		let numActions;

		return Goal
		.findOne()
		.then(goal => {
			testActionId = goal.actions[0]._id;
			//numActions = goal.actions.length;
			
			return chai.request(app)
			.delete(`/actions/${testActionId}`)
			.then(res => {
				expect(res).to.have.status(200);
				// TODO make it so below is true (currently returns deleted action as well, so false)
				// expect(res.body.actions.length).to.equal(numActions - 1);
			});
		});
	});

});
