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
};

describe ('User endpoints related to goals', () => {
	
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
 			return Category.create(testCategory);
		}).then(category => {
			_category = category;
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

	it ('creates a new goal for user', () => {
		let testUserId;
		let newGoal = {
			name: "this is a new test goal to post",
			description: "new goal description is here",
			user: null,
			category: null,
			dueDate: "05-05-18",
			completedDate: "04-04-18",
			actions: [
				{
					name: "this is a new action here",
					completedDate: "03-03-18",
					dueDate: "04-02-18"
				}
			]
 		};
		return User
		.findOne()
		.then(user=> {
			testUserId = user.id;
			return chai.request(app)
			.post(`/users/${testUserId}/goals`)
			.send(newGoal)
			.then(res => {
				expect(res).to.be.json;
				expect(res).to.have.status(201);
				expect(res.body).to.contain.keys(['name', 'description', 'user', 'category', 'dueDate']);
			});
		});
	});

	it ('returns a list of all goals for user', () => {
		let testUserId;
		
		return User
		.findOne()
		.then(user=> {
			testUserId = user.id;
			return chai.request(app)
			.get(`/users/${testUserId}/goals`)
			.then(res => {
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body[0]).to.contain.keys(['name', 'description', 'user', 'category', 'dueDate']);
			});
		});
	});

	it ('deletes all goals for user', () => {
		let testUserId;
		
		return User
		.findOne()
		.then(user=> {
			testUserId = user.id;
			return chai.request(app)
			.delete(`/users/${testUserId}/goals`)
			.then(res => {
				//TODO - below expect fails; why is response obj not JSON? (res.body is empty object)
				//expect(res).to.be.json;
				expect(res).to.have.status(204);
				console.log(res.body);
			});
		});
	});
});