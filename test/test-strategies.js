const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const { Strategy } = require ('../models');
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


describe('Strategies', () => {

	function seedTestData() {
		
		const testStrategy = {
			name: "hey i'm a test strategy",
			description: "description of a strategy",
			source: "this is a source for a strategy"
		};
	
		return Strategy.create(testStrategy);
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


	it ('should list strategies on GET', () => {
		return chai.request(app)
		.get('/strategies')
		.then(res => {
			expect(res).to.have.status(200);
			expect(res).to.be.json
		});
	});

	it ('should add a new strategy on POST', () => {
		
		const testPostStrategy = {
			name: "posting strategy",
			description: "description of a strategy being posted",
			source: "this is a source for the posted strategy"
		};

		return chai.request(app)
		.post('/strategies')
		.send(testPostStrategy)
		.then(res => {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body.name).to.equal(testPostStrategy.name);
			expect(res.body.description).to.equal(testPostStrategy.description);
			expect(res.body.source).to.equal(testPostStrategy.source)
		});
	});

	it ('should list a strategy by given id on GET', () => {
		
		let testStrategyId
		let testStrategyName
		let testStrategyDescription
		let testStrategySource
		
		return Strategy
		.findOne()
		.then(strategy => {
			testStrategyId = strategy.id;
			testStrategyName = strategy.name;
			testStrategyDescription = strategy.description;
			testStrategySource = strategy.source;

			return chai.request(app)
			.get(`/strategies/${testStrategyId}`)
			.then(res => {
				expect(res.body._id).to.equal(testStrategyId);
				expect(res.body.name).to.equal(testStrategyName);
				expect(res.body.description).to.equal(testStrategyDescription);
				expect(res.body.source).to.equal(testStrategySource);
				expect(res).to.have.status(200);
				expect(res).to.be.json;
			});
		});
	});

	it ('should delete a strategy by id', () => {
		let testStrategyId;

		return Strategy
		.findOne()
		.then(strategy => {
			testStrategyId = strategy.id;

			return chai.request(app)
			.delete(`/strategies/${testStrategyId}`)
			.then(res => {
				expect(res).to.have.status(204);
			});

			//WIP - test whether id is nonexistent
			/*.then(() => {
				return chai.request(app)
				.get(`/strategies/${testStrategyId}`)
				.then(res => {
					expect(res).to.have.status(500);
				});
			});*/
		});
	});

	it ('should update a strategy by id', () => {
		let testStrategyId;
		let updatedStrategyName;

		return Strategy
		.findOne()
		.then(strategy => {
			testStrategyId = strategy.id;
			updatedStrategyName = {"name": "the test strategy has a new name"}

			return chai.request(app)
			.put(`/strategies/${testStrategyId}`)
			.send(updatedStrategyName)
			.then(res => {
				expect(res).to.have.status(204);

				return chai.request(app)
				.get(`/strategies/${testStrategyId}`)
				.then(res => {
					expect(res.body.name).to.equal(updatedStrategyName.name);
				});
			});
		});
	});
});