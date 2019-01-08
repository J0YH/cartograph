const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const strategySchema = mongoose.Schema({
	name: String,
	description: String,
	source: String
});

const goalSchema = mongoose.Schema({
	name: String,
  	description: String,
  	user: {
  		ref: "user",
  		type: mongoose.Schema.Types.ObjectId
  	},
  	category: {
  		ref: "category",
  		type: mongoose.Schema.Types.ObjectId
  	},
  	dueDate: Date,
 	completedDate: Date,
	actions: [
	    {
	      name: String,
	      completedDate: Date,
	      dueDate: Date
	    }
	  ]
});

const categorySchema = mongoose.Schema({
	name: String
});

const industrySchema = mongoose.Schema({
	name: String
});

const accomplishmentSchema = mongoose.Schema({
	name: String,
	description: String,
  	user: {
		ref: "user",
		type: mongoose.Schema.Types.ObjectId
  	},
	category: {
  		ref: "category",
  		type: mongoose.Schema.Types.ObjectId
  	},
  	completedDate: Date
});

const userSchema = mongoose.Schema({
	name: {
	    firstName: String,
	    lastName: String
	  },
	username: String,
	password: String,
	email: String,
	industry: {
		ref: "industry",
		type: mongoose.Schema.Types.ObjectId
	},
	experience: Number,
	location: {
		country: String,
		state: String,
		city: String
	},
	about: String,
	strategies: [{
		strategy: {
			ref: "strategy",
			type: mongoose.Schema.Types.ObjectId
		},
		rating: [{
			date: Date,
			value: Number
		}]
	}]
});


/*

Use this for auth?

const bcrypt = require('bcryptjs');

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};


*/

const Strategy = mongoose.model('strategy', strategySchema);
const Category = mongoose.model('category', categorySchema);
const Goal = mongoose.model('goal', goalSchema);
const Accomplishment = mongoose.model('accomplishment', accomplishmentSchema);
const User = mongoose.model('user', userSchema);
const Industry = mongoose.model('industry', industrySchema);

module.exports = { Strategy, Category, Industry, Goal, Accomplishment, User };