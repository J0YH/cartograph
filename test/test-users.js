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

describe('Users', () => {
	
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

	//return seedTestData();

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

	it ('should list all users on GET', () => {
		return chai.request(app)
		.get('/users')
		.then(res => {
			expect(res).to.be.json;
			expect(res).to.have.status(200);
		});
	});


	it ('should list a user by given id on GET', () => {
		
		let testUserId;
		let testUserActualName;
		let testUsername;
		let testUserpassword;
		let testUserEmail;
		let testUserIndustry;
		let testUserExperience;
		let testUserLocation;
		let testUserAbout;
		let testUserStrategies;
		
		return User
		.findOne()
		.then(user => {
			testUserId = user.id;
			testUserFirstName = user.name.firstName;
			testUserLastName = user.name.lastName;
			testUsername = user.username;
			testUserPassword = user.password;
			testUserEmail = user.email;
			testUserIndustry = user.industry;
			//console.log(testUserIndustry);
			testUserExperience = user.experience;
			testUserLocation = user.location;
			testUserAbout = user.about;
			testUserStrategies = user.strategies;

			return chai.request(app)
			.get(`/users/${testUserId}`)
			.then(res => {
				expect(res.body._id).to.equal(testUserId);
				expect(res.body.name.firstName).to.equal(testUserFirstName);
				expect(res.body.name.lastName).to.equal(testUserLastName);
				expect(res.body.username).to.equal(testUsername);
				expect(res.body.password).to.equal(testUserPassword);	
				expect(res.body.email).to.equal(testUserEmail);
				expect(res.body.industry).to.equal(testUserIndustry.toString());
				expect(res.body.experience).to.equal(testUserExperience);
				expect(res.body.location.country).to.equal(testUserLocation.country);
				expect(res.body.location.state).to.equal(testUserLocation.state);
				expect(res.body.location.city).to.equal(testUserLocation.city);
				expect(res.body.about).to.equal(testUserAbout);
				expect(res.body.strategies).to.be.a("array");
				expect(res.body.strategies[0].strategy).to.equal(testUserStrategies[0].strategy.toString());
				expect(res.body.strategies[0].rating).to.be.a("array");
				expect(res.body.strategies[0].rating[0]).to.contain.keys("date", "value");
				//console.log(res.body.strategies[0]);
				//console.log(testUserStrategies);
				expect(res).to.have.status(200);
				expect(res).to.be.json;
			});
		});
	});


	it ('should delete a user by given id', () => {
		let testUserId;

		return User
		.findOne()
		.then(user => {
			testUserId = user.id;

			return chai.request(app)
			.delete(`/users/${testUserId}`)
			.then(res => {
				expect(res).to.have.status(204);
			});
		});
	});

	it ('should update a user by given id on PUT', () => {

		let testUserId;
		let updatedUserAbout;

		return User
		.findOne()
		.then(user => {
			testUserId = user.id;
			updatedUserAbout = {"about": "new test, new user! this is my new about me!"};


			return chai.request(app)
			.put(`/users/${testUserId}`)
			.send(updatedUserAbout)
			.then(res => {
				expect(res).to.have.status(204);
				return chai.request(app)
				.get(`/users/${testUserId}`)
				.then(res => {
					expect(res.body.about).to.equal(updatedUserAbout.about);
				});
			});
		});
	});

	it ('should create a new user on POST', () => {
		
		const testPostUser = {

			name: {
			    firstName: "Abigail",
			    lastName: "Adams"
			  },
			username: "itsmeAbby",
			password: "secreto",
			email: "itsabby@email.com",
			industry: null,
			experience: "7",
			location: {
				country: "USA",
				state: "Braintree",
				city: "Massachusetts"
			},
			about: "I'm one smart lady!",
			strategies: []
		};

		const testIndustry = {
			name: "hey i'm a test post industry"
		};

		const testStrategy = {
			name: "hey i'm a test post strategy",
			description: "this is a neato description of a test post strategy",
			source: "this is where the post strategy is from!"
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
          testPostUser.industry = _industry;
          testPostUser.strategies.push({
            strategy: _strategy,
            rating: [{
            	date: "01-01-16",
            	value: "1"
            }]
          })
          return User.create(testPostUser);
        });

		return chai.request(app)
		.post('/users')
		.send(testPostUser)
		.then(res => {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body.name.firstName).to.equal(testPostUser.name.firstName);
			expect(res.body.name.lastName).to.equal(testPostUser.name.lastName);
			expect(res.body.username).to.equal(testPostUser.username);
			expect(res.body.password).to.equal(testPostUser.password);	
			expect(res.body.email).to.equal(testPostUser.email);
			expect(res.body.experience).to.equal(testPostUser.experience);
			expect(res.body.location.country).to.equal(testPostUser.location.country);
			expect(res.body.location.state).to.equal(testPostUser.location.state);
			expect(res.body.location.city).to.equal(testPostUser.location.city);
			expect(res.body.about).to.equal(testPostUser.about);
			expect(res.body.strategies).to.be.a("array");
			expect(res.body.strategies[0].strategy).to.equal(testPostUser.strategies[0].strategy.toString());
			expect(res.body.strategies[0].rating).to.be.a("array");
			expect(res.body.strategies[0].rating[0]).to.contain.keys("date", "value");
		});
	});

});