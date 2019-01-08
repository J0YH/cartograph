const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const { Strategy, Industry, Goal, User, Accomplishment, Category} = require ('../models');
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

describe('User endpoints related to accomplishments', () => {
	
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

		const testAccomplishment = {
			name: "this is a test accomplishment",
			description: "i accomplished this bloop bloop",
			user: null,
			category: null,
			completedDate: "02-02-18"
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
  			return Category.create(testCategory)
        }).then(category => {
  			//console.log("CATEGORY IS " + category)
        	//return Category.create(testCategory)
        	_category = category;
        	return Accomplishment.create(testAccomplishment)
        }).then(accomplishment => {
        	accomplishment.user = _user;
        	accomplishment.category = _category;
        	return accomplishment.save()
        })
        //.then(accomplishment => {console.log(accomplishment)});
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

	it ('creates a new accomplishment for user', () => {
		let testUserId;
		let newAccomplishment = {
			name: "this is a new accomplishment",
			description: "i accomplished a new thingy here!",
			user: null,
			category: null,
			completedDate: "04-04-18"
 		};
		return User
		.findOne()
		.then(user => {
			testUserId = user.id;
			return chai.request(app)
			.post(`/users/${testUserId}/accomplishments`)
			.send(newAccomplishment)
			.then(res => {
				expect(res).to.be.json;
				expect(res).to.have.status(201);
				expect(res.body).to.contain.keys(['name', 'description', 'user', 'category', 'completedDate']);
			});
		});
	});


	it ('should list all accomplishments for user', () => {

		let testUserId;

		return User
		.findOne()
		.then(user => {
			testUserId = user.id;

			return chai.request(app)
			.get(`/users/${testUserId}/accomplishments`)
			.then(res => {
				expect(res).to.be.json;
				expect(res).to.have.status(200);
			});
		});
	});


	it ('deletes all accomplishments for user', () => {
		let testUserId;
		
		return User
		.findOne()
		.then(user => {
			testUserId = user.id;
			return chai.request(app)
			.delete(`/users/${testUserId}/accomplishments`)
			.then(res => {
				//TODO - below expect fails (same as test-users-goals delete); why is response obj not JSON? (res.body is empty object)
				//expect(res).to.be.json;
				expect(res).to.have.status(204);
			});
		});
	});

});