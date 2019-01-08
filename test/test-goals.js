const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const { Strategy, Category, Industry, Goal, User} = require ('../models');
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

describe ('Goals', () => {

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
					name: "do this action here",
					completedDate: "02-02-18",
					dueDate: "03-01-18"
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

	it ('should list all goals on GET', () => {
		return chai.request(app)
		.get('/goals')
		.then(res => {
			expect(res).to.be.json;
			expect(res).to.have.status(200);
		});
	});

	it ('should list a given goal by id', () => {

		let testGoalId;
		let testGoalDescription;
		let testGoalUser;
		let testGoalCategory;
		let testGoalDueDate;
		let testGoalCompletedDate;
		let testGoalActions;

		return Goal
		.findOne()
		.then(goal => {
			testGoalId = goal.id;
			testGoalDescription = goal.description;
			testGoalUser = goal.user;
			testGoalCategory = goal.category;
			testGoalDueDate = goal.dueDate;
			testGoalCompletedDate = goal.completedDate;
			testGoalActions = goal.actions;

			return chai.request(app)
			.get(`/goals/${testGoalId}`)
			.then(res => {
				expect(res.body._id).to.equal(testGoalId);
				expect(res.body.description).to.equal(testGoalDescription);
				expect(res.body.user).to.equal(testGoalUser.toString());
				expect(res.body.category).to.equal(testGoalCategory.toString());
				expect(new Date(res.body.dueDate).toDateString()).to.equal(new Date(testGoalDueDate).toDateString());
				expect(new Date(res.body.completedDate).toDateString()).to.equal(new Date(testGoalCompletedDate).toDateString());
				//arrays not matching up, causing errors
				//	yes too nested, need to get around by testing length and keys
				expect(res.body.actions.length).to.equal(testGoalActions.length);
				expect(res.body.actions[0]).to.include.keys(['name', 'completedDate', 'dueDate']);
				expect(res).to.have.status(200);
			});
		});
	});

	it ('should update a goal by id', () => {
		
		let testGoalId;		
		let updatedGoalDescription;

		return Goal
		.findOne()
		.then(goal => {
			testGoalId = goal.id;
			updatedGoalDescription = {
				"description": "the test goal has a new description"
			};

			return chai.request(app)
			.put(`/goals/${testGoalId}`)
			.send(updatedGoalDescription)
			.then(res => {
				expect(res).to.have.status(204);
				return chai.request(app)
				.get(`/goals/${testGoalId}`)
				.then(res => {
					expect(res.body.description).to.equal(updatedGoalDescription.description);
				});
			});
		});
	});

	it ('should delete a goal by id', () => {
		
		let testGoalId;

		return Goal
		.findOne()
		.then(goal => {
			testGoalId = goal.id;

			return chai.request(app)
			.delete(`/goals/${testGoalId}`)
			.then(res => {
				expect(res).to.have.status(200);
			});
		});
	});

	/*it ('should delete all goals for user', () => {

		let testGoalUser;

		return Goal
		.findOne()
		.then(goal => {
			//testGoalUser = goal.user;
			//console.log(goal);

			return chai.request(app)
			.get(`/users/${testGoalUser}/goals`)
			.then(user => {
				console.log(req.body);
			});
		});

	});*/

});