const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
/* user faker to populate tests post-MVP
const faker = require('faker');*/

const expect = chai.expect;

const { Industry } = require ('../models');
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

describe('Industries', () => {
	
	function seedTestData() {
		
		const testIndustry = {
			name: "hey i'm a test industry"
		};
	
		return Industry.create(testIndustry);
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

	it ('should list all industries on GET', () => {
		return chai.request(app)
		.get('/industries')
		.then(res => {
			expect(res).to.be.json;
			expect(res).to.have.status(200);
		});
	});


	it ('should list an industry by given id on GET', () => {

		let testIndustryId;
		let testIndustryName;

		return Industry
		.findOne()
		.then(industry => {

			testIndustryId = industry.id;
			testIndustryName = industry.name;


			return chai.request(app)
			.get(`/industries/${testIndustryId}`)
			.then(res => {
				expect(res.body._id).to.equal(testIndustryId);
				expect(res.body.name).to.equal(testIndustryName);
				expect(res).to.have.status(200);
			});
		});
	});

});