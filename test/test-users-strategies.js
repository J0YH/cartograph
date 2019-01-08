const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const { Strategy, Industry, Goal, User} = require ('../models');
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

describe ('User endpoints related to strategies', () => {
	
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

		let _industry;
		let _strategy;
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

	it ('adds a strategy to a user', () => {

		let testUserId;

		let newStrategy;

		return Strategy
		.findOne()
		.then(strategy => {
			newStrategy = {
				strategy: strategy.id
			};

			return User
			.findOne()
			.then(user => {
				testUserId = user.id;

				return chai.request(app)
				.post(`/users/${testUserId}/strategies`)
				.send(newStrategy)
				.then(res => {
					expect(res).to.have.status(200);
					expect(res.body.strategies.length).to.be.at.least(1);
					expect(res).to.be.json;
				});
			});
		});
	});

	it ('lists all strategies claimed by a user', () => {

		let testUserId;

		return User
		.findOne()
		.then(user => {
			testUserId = user.id;

			return chai.request(app)
			.get(`/users/${testUserId}/strategies`)
			.then(res => {
				expect(res).to.be.json;
				expect(res.body[0].strategy).to.contain.keys(['name', 'description', 'source']);
				expect(res).to.have.status(200);
			});
		});
	});

	it ('adds a rating to a strategy', () => {

		let testUserId;
		let testStrategyId;
		let testRating = {
		  	rating: {
			    date: "01-01-2017",
			    value: "4"
	    	}
		};

		return User
		.findOne()
		.then(user => {
			testUserId = user.id;

			return chai.request(app)
			.get(`/users/${testUserId}/strategies`)
			.then(res => {
				testStrategyId = res.body[0].strategy._id;
				return chai.request(app)
				.post(`/users/${testUserId}/strategies/${testStrategyId}/ratings`)
				.send(testRating)
				.then(res => {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.contain.keys(['n', 'nModified', 'ok']);
				});
			});
		});
	});

	it ('deletes a strategy claimed by a user', () => {

		let testUserId;
		let testStrategyId;

		return User
		.findOne()
		.then(user => {
			testUserId = user.id;

			return chai.request(app)
			.get(`/users/${testUserId}/strategies`)
			.then(res => {
				testStrategyId = res.body[0].strategy._id;
				return chai.request(app)
				.delete(`/users/${testUserId}/strategies/${testStrategyId}`)
				.then(res => {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
				});
			});
		});
	});

});