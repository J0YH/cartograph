const { User } = require('../models');
const { Strategy: LocalStrategy } = require('passport-local');
const bcryptjs = require('bcryptjs');

const localStrategy = new LocalStrategy((username, password, done) => {
	let _user;
	User.findOne({username})
	.then(user => {
		if (!user) {
			return Promise.reject('Invalid user');
		}
		_user = user;
		return bcryptjs.compare(password, user.password);
	}).then(isAllowed => {
		if (!isAllowed) {
			return Promise.reject('Invalid password');
		}
		return done(null, _user);
	}).catch(err => {
		return done(err);
	})
});

module.exports = { localStrategy };