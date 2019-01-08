const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
/* user faker to populate tests post-MVP
const faker = require('faker');*/

const expect = chai.expect;

const { Category } = require ('../models');
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



describe('Categories', () => {

	function seedTestData() {
		
		const testCategory = {
			name: "hey i'm a test category"
		};
	
		return Category.create(testCategory);
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

	it ('should list all categories on GET', () => {
		return chai.request(app)
		.get('/categories')
		.then(res => {
			expect(res).to.be.json;
			expect(res).to.have.status(200);
		});
	});

	it ('should list a category by given id on GET', () => {

		let testCategoryId;
		let testCategoryName;

		return Category
		.findOne()
		.then(category => {
			testCategoryId = category.id;
			testCategoryName = category.name;

			return chai.request(app)
			.get(`/categories/${testCategoryId}`)
			.then(res => {
				expect(res.body._id).to.equal(testCategoryId);
				expect(res.body.name).to.equal(testCategoryName);
				expect(res).to.have.status(200);
			});
		});
	});


	it ('should update a category by given id on PUT', () => {

		let testCategoryId;
		let updatedCategoryName;

		return Category
		.findOne()
		.then(category => {
			testCategoryId = category.id;
			updatedCategoryName = {"name": "the test category has a new name"};

			return chai.request(app)
			.put(`/categories/${testCategoryId}`)
			.send(updatedCategoryName)
			.then(res => {
				expect(res).to.have.status(204);

				return chai.request(app)
				.get(`/categories/${testCategoryId}`)
				.then(res => {
					expect(res.body.name).to.equal(updatedCategoryName.name);
				});
			});
		});
	});

	it ('should create a new category on POST', () => {
		
		const testPostCategory = {
			name: "posting a new category"
		};

		return chai.request(app)
		.post('/categories')
		.send(testPostCategory)
		.then(res => {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body.name).to.equal(testPostCategory.name);
		});
	});

	it ('should delete a category by given id', () => {
		let testCategoryId;

		return Category
		.findOne()
		.then(category => {
			testCategoryId = category.id;

			return chai.request(app)
			.delete(`/strategies/${testCategoryId}`)
			.then(res => {
				expect(res).to.have.status(204);
			});
		});
	});
});