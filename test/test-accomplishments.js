const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const { Category, Accomplishment, User} = require ('../models');
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

describe ('Accomplishments', () => {

	function seedTestData() {
		const testAccomplishment = {
			name: "this is a test accomplishment",
			description: "i accomplished this bloop bloop",
			user: null,
			category: null,
			completedDate: "02-02-18"
		};

		return Accomplishment.create(testAccomplishment);
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

	it ('should return all accomplishments', () => {

		return chai.request(app)
		.get('/accomplishments')
		.then(res => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
		});
	});

	it ('should return accomplishment by id', () => {

		let testAccomplishmentId;
		let testAccomplishmentDescription;
		let testAccomplishmentCompletedDate;

		return Accomplishment
		.findOne()
		.then(accomplishment => {
			testAccomplishmentId = accomplishment.id;
			testAccomplishmentDescription = accomplishment.description;
			testAccomplishmentCompletedDate = accomplishment.completedDate;
			return chai.request(app)
			.get(`/accomplishments/${testAccomplishmentId}`)
			.then(res => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.description).to.equal(testAccomplishmentDescription);
				expect(new Date(res.body.completedDate).toString()).to.equal(new Date(testAccomplishmentCompletedDate).toString());
			});
		});
	});

	it ('should delete accomplishment by id', () => {

		let testAccomplishmentId;

		return Accomplishment
		.findOne()
		.then(accomplishment => {
			testAccomplishmentId = accomplishment.id;
			return chai.request(app)
			.delete(`/accomplishments/${testAccomplishmentId}`)
			.then(res => {
				expect(res).to.have.status(200);
			});
		});
	});

	it ('should update accomplishment by id', () => {

		let testAccomplishmentId;
		let updatedAccomplishmentName = {
			"name": "accomplishment name has been updated!!!"
		};

		return Accomplishment
		.findOne()
		.then(accomplishment => {
			testAccomplishmentId = accomplishment.id;

			return chai.request(app)
			.put(`/accomplishments/${testAccomplishmentId}`)
			.send(updatedAccomplishmentName)
			.then(res => {
				expect(res).to.have.status(204);
				
				return chai.request(app)
				.get(`/accomplishments/${testAccomplishmentId}`)
				.then(accomplishment => {
					expect(accomplishment.body.name).to.equal(updatedAccomplishmentName.name);
				});
			});
		});
	});
});

