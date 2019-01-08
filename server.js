// IMPORTS & REQUIRES
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { localStrategy } = require('./strategies/local');
const { jwtStrategy } = require('./strategies/jwt');
const { JWT_SECRET } = require('./config');
const bcryptjs = require('bcryptjs');

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { Strategy, Category, Industry, Goal, Accomplishment, User } = require('./models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());
passport.use(localStrategy);
passport.use(jwtStrategy);

const localAuth = passport.authenticate('local', { session: false, failWithError: true });
const jwtAuth = passport.authenticate('jwt', { session: false });

// ENDPOINTS

// use is "use middleware"
//app.use(express.static("static"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/views/index.html'))
});

function createToken(user) {
	return jwt.sign({user}, JWT_SECRET, {expiresIn: '2d'});
}

app.post('/login', localAuth, (req, res) => {
	const authToken = createToken(req.user);
	res.json({authToken});
})


// STRATEGIES

// STRATEGIES - create new
app.post('/strategies', (req, res) => {

	const requiredFields = ["name", "description", "source"];

	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body!`
			res.status(400).send(message);
		};
	};

	const newStrategy = {
		name: req.body.name,
		description: req.body.description,
		source: req.body.source
	}

	Strategy
	.create(newStrategy)
	.then(strategy => {
		console.log(strategy);
		res.status(201).json(strategy)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: "Internal server error"})
	});
});

// STRATEGIES - get all 
app.get('/strategies', (req, res) => {
	Strategy
	.find()
	.then(strategies => {res.status(200).json(strategies)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});

// STRATEGIES - get by id
app.get('/strategies/:id', (req, res) => {
	Strategy
	.findById(req.params.id)
	.then(strategy => {
		res.status(200).json(strategy)
	}).catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});

// STRATEGIES - delete by id
app.delete('/strategies/:id', (req, res) => {
	Strategy
	.findByIdAndRemove(req.params.id)
	.then(() => {
		res.status(204).json({message: 'Success!'})
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});

// STRATEGIES - update
app.put('/strategies/:id', (req, res) => {

	const updatedData = {}
	
	const updateableFields = ["name", "description", "source"]

	updateableFields.forEach(field => {
		if (field in req.body) {
			updatedData[field] = req.body[field];
		}
	});

	Strategy
	.findOneAndUpdate({_id: req.params.id}, { $set: updatedData }, { new: true })
	.then((updatedStrategy) => {
		res.status(204).end()
	}).catch(err => {
		console.log(err);
		res.status(500),json({message:"Internal server error"})
	});
});

// STRATEGIES - add a strategy to user
app.post('/users/:id/strategies', (req, res) => {
	User
	.findOne({_id: req.params.id, "strategies.strategy": req.body.strategy})
	.then(user => {
		if (!user) {
			return User
   				.findByIdAndUpdate(req.params.id, {$addToSet: {strategies: {strategy: req.body.strategy}}})
		} else {
			return user
		}
	})
	.then(user => {
   	User
   	.findById(user._id)
   	.populate("strategies.strategy")
   	.then((user) => {
   		res.status(200).json(user.strategies)
   	})
   })
    .catch(err => {
        res.status(500).json(err);
    })
})

// STRATEGIES - get all by user
app.get('/users/:id/strategies', jwtAuth, (req, res) => {
	User
	.findById(req.user._id)
	.populate("strategies.strategy")
	.then((user) => {
		res.status(200).json(user.strategies)
	}).catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});

// STRATEGIES - delete by id for user
app.delete('/users/:user_id/strategies/:strategy_id', jwtAuth, (req, res) => {
	User
	.findByIdAndUpdate(req.params.user_id, {$pull: {strategies: {strategy: req.params.strategy_id}}})
	.then(user => {
		User
	   	.findById(user._id)
	   	.populate("strategies.strategy")
	   	.then((user) => {
	   		res.status(200).json(user.strategies)
	   	})
   	})
    .catch(err => {
        res.status(500).json(err);
    });
});

// STRATEGIES - delete all by user
app.delete('/users/:id/strategies', (req, res) => {
	User
	.findByIdAndUpdate(req.params.id, {$set: {strategies: []}})
	.then(()=> {
		res.status(204).json({message: 'Success!'})
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});

// STRATEGIES - add a user rating to a strategy`
app.post('/users/:user_id/strategies/:strategy_id/ratings/', jwtAuth, (req, res) => {
	// need to optimize to grab and send to client only the strategy that just received a rating
    const myId = req.params.strategy_id;

    User.update(
        {"_id": req.params.user_id, strategies: {"$elemMatch": {"_id": req.params.strategy_id}}},
        { $push: { "strategies.$.rating": req.body} }
    ).exec();

    User
	.findById(req.user._id)
	.populate("strategies.strategy")
	.then((user) => {
		res.status(200).json(user.strategies)
	}).catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});

// INDUSTRIES

// INDUSTRIES - get all
app.get("/industries", (req, res) => {
	Industry
	.find()
	.then(industries => {
		res.status(200).json(industries)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});


// INDUSTRIES - get one by id
app.get('/industries/:id', (req, res) => {
	Industry
	.findById(req.params.id)
	.then(industry => {
		res.status(200).json(industry)
	}).catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});


// CATEGORIES

// CATEGORIES - get all
app.get("/categories", (req, res) => {
	Category
	.find()
	.then(categories => {res.status(200).json(categories)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});


// CATEGORIES - get one by id
app.get('/categories/:id', (req, res) => {
	Category
	.findById(req.params.id)
	.then(category => {
		res.status(200).json(category)
	}).catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});

// CATEGORIES - update by id
app.put('/categories/:id', (req, res) => {

	const updatedData = {}
	
	const updateableFields = ["name"]

	updateableFields.forEach(field => {
		if (field in req.body) {
			updatedData[field] = req.body[field];
		}
	});

	Category
	.findOneAndUpdate({_id: req.params.id}, { $set: updatedData }, { new: true })
	.then((updatedCategory) => {
		res.status(204).end()
	}).catch(err => {
		console.log(err);
		res.status(500),json({message:"Internal server error"})
	});
});

// CATEGORIES - create new
app.post('/categories', (req, res) => {

	const requiredFields = ["name"];

	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body!`
			return res.status(400).send(message);
		};
	};

	const newCategory = {
		name: req.body.name,
	}

	Category
	.create(newCategory)
	.then(category => {
		console.log(category);
		res.status(201).json(category)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: "Internal server error"})
	});
});

// CATEGORIES - delete by id
app.delete('/categories/:id', (req, res) => {
	Category
	.findByIdAndRemove(req.params.id)
	.then(() => {
		res.status(204).json({message: "Success!"})
	}).catch(err => {
		console.log(err);
		res.status(500).json({message:"Internal server error"})
	});
});

// GOALS

// GOALS - get all
app.get('/goals', (req, res) => {
	Goal
	.find()
	.populate("user")
	.then(goals => {res.status(200).json(goals)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});

// GOALS - get by id
app.get('/goals/:id', (req, res) => {
	Goal
	.findById(req.params.id)
	.then(goal => {
		res.status(200).json(goal)
	}).catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});

// GOALS - update
app.put('/goals/:id', jwtAuth, (req, res) => {

	const updatedData = {}
	
	const updateableFields = ["name", "description", "category", "dueDate", "user", "completedDate", "actions"]

	updateableFields.forEach(field => {
		if (field in req.body) {
			updatedData[field] = req.body[field];
		}
	});

	Goal
	.findOneAndUpdate({_id: req.params.id}, { $set: updatedData }, { new: true })
	.then((updatedGoal) => {
		res.status(200).json(updatedGoal)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message:"Internal server error"})
	});
});

// GOALS - delete by id
app.delete('/goals/:id', (req, res) => {
	Goal
	.findByIdAndRemove(req.params.id)
	.then(() => {
		res.status(200).json({message: 'Success!'})
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});

// GOALS - get all by user
app.get('/users/:id/goals', jwtAuth, (req, res) => {
	Goal
	.find({user: req.user._id})
	.sort({dueDate: 1})
	.then(goals => {
		res.status(200).json(goals)
	}).catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});

// GOALS - create new by user
app.post("/users/:id/goals", jwtAuth, (req, res) => {
	
	const requiredFields = ["name", "description", "user", "category", "dueDate"];

	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body!`
			return res.status(400).send(message);
		};
	};

	const newGoal = {
		name: req.body.name,
	  	description: req.body.description,
	  	user: req.params.id,
	  	category: req.body.category,
	  	dueDate: req.body.dueDate,
	 	completedDate: req.body.completedDate,
		actions: req.body.actions
	};

	Goal
	.create(newGoal)
	.then(goal => {
		//console.log(goal);
		res.status(201).json(goal)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: "Internal server error"})
	});
});

// GOALS - delete all by user
app.delete('/users/:id/goals', (req, res) => {
	Goal
	.remove({user: req.params.id})
	.exec()
	.then(() => {
		res.status(204).json({message: "Success!"})
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});	
});

// ACCOMPLISHMENTS

// ACCOMPLISHMENTS - get all
app.get('/accomplishments', (req, res) => {
	Accomplishment
	.find()
	.then(accomplishments => {res.status(200).json(accomplishments)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});

// ACCOMPLISHMENTS - get by id
app.get('/accomplishments/:id', (req, res) => {
	Accomplishment
	.findById(req.params.id)
	.then(accomplishment => {
		res.status(200).json(accomplishment)
	}).catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});


// ACCOMPLISHMENTS - delete
app.delete('/accomplishments/:id', jwtAuth, (req, res) => {
	Accomplishment
	.findByIdAndRemove(req.params.id)
	.then((accomplishment) => {
		res.status(200).json(accomplishment);
		//console.log('accomplishment is', accomplishment);
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});

// ACCOMPLISHMENTS - update by id
app.put('/accomplishments/:id', jwtAuth, (req, res) => {
	
	const updatedData = {}
	
	const updateableFields = ["name", "description", "user", "category", "dueDate", "completedDate"]

	updateableFields.forEach(field => {
		if (field in req.body) {
			updatedData[field] = req.body[field];
		}
	});

	Accomplishment
	.findOneAndUpdate({_id: req.params.id}, { $set: updatedData }, { new: true })
	.then((updatedGoal) => {
		res.status(200).json(updatedGoal)
	}).catch(err => {
		console.log(err);
		res.status(500),json({message:"Internal server error"})
	});
})

// ACCOMPLISHMENTS - create by user
app.post("/users/:id/accomplishments", jwtAuth, (req, res) => {
	
	const requiredFields = ["name", "description", "user", "category", "completedDate"];

	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body!`
			return res.status(400).send(message);
		};
	};

	const newAccomplishment = {
		name: req.body.name,
	  	description: req.body.description,
	  	user: req.params.id,
	  	category: req.body.category,
	 	completedDate: req.body.completedDate,
	};

	Accomplishment
	.create(newAccomplishment)
	.then(accomplishment => {
		//console.log(accomplishment);
		res.status(201).json(accomplishment)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: "Internal server error"})
	});
});


// ACCOMPLISHMENTS by user - get all
app.get('/users/:id/accomplishments', jwtAuth, (req, res) => {
	Accomplishment
	.find({user: req.user._id})
	.then(accomplishments => {
		res.status(200).json(accomplishments)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});


// ACCOMPLISHMENTS by user - delete all
app.delete('/users/:id/accomplishments', (req, res) => {
	Accomplishment
	.remove({user: req.params.id})
	.then(() => {
		res.status(204).json({message: "Success!"})
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});

// USER - get all
app.get('/users', (req, res) => {
	User
	.find()
	.then(users => {
		res.status(200).json(users)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: "Interal server error"})
	});
});

// USER - get by id
app.get('/users/:id', jwtAuth, (req, res) => {
	User
	.findById(req.params.id)
	.then(user => {
		console.log(user);
		res.status(200).json(user)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: "Internal server error"})
	});
});

// USER - delete by id
app.delete('/users/:id', (req, res) => {
	User
	.findByIdAndRemove(req.params.id)
	.then(() => {
		res.status(204).json({message: "Success!"})
	}).catch(err => {
		console.log(err);
		res.status(500).json({message:"Internal server error"})
	});
});

// USER - update by id
app.put('/users/:id', jwtAuth, (req, res) => {
	
	const updatedData = {}
	
	const updateableFields = ["name", "username", "password", "email", "industry", "experience", "location", "about"]

	updateableFields.forEach(field => {
		if (field in req.body) {
			updatedData[field] = req.body[field];
		}
	});

	if (updatedData.password) {
		bcryptjs.hash(updatedData.password, 10)
		.then(passwordHash => {
			updatedData.password = passwordHash;
			User.findOneAndUpdate({_id: req.params.id}, { $set: updatedData }, { new: true })
		.then((updatedUser) => {
			res.status(200).json(updatedUser)
		}).catch(err => {
			console.log(err);
			res.status(500),json({message:"Internal server error"})
		});
		})
	} else {
		User
		.findOneAndUpdate({_id: req.params.id}, { $set: updatedData }, { new: true })
		.then((updatedUser) => {
			res.status(200).json(updatedUser)
		}).catch(err => {
			console.log(err);
			res.status(500),json({message:"Internal server error"})
		});
	}

	
})

// USER - create
app.post('/users', (req, res) => {
	
	const requiredFields = ["name", "username", "password", "email", "industry", "experience", "location", "about"];

	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body!`
			res.status(400).send(message);
		};
	};

	bcryptjs.hash(req.body.password, 10)
	.then(passwordHash => {
		const newUser = {
			name: req.body.name,
		  	username: req.body.username,
		  	password: passwordHash,
		  	email: req.body.email,
		 	industry: req.body.industry,
			experience: req.body.experience,
			location: req.body.location,
			about: req.body.about,
		}
		return User.create(newUser);
	})
	.then(user => {
		//console.log(user);
		res.status(201).json(user)
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: "Internal server error"})
	});
});

// ACTIONS

// ACTION - get all actions for a goal
app.get('/goals/:id/actions/', (req, res) => {
	Goal
	.findOne({"_id": req.params.id})
	.then((goal) => {
		//console.log(goal);
		//console.log(goal.get("actions"));
		res.status(200).json(goal.get("actions"))
	}).catch(err => {
		console.log(err);
		res.status(500).json(err);
	})
});



// ACTION - create
app.post('/goals/:id/actions', jwtAuth, (req, res) => {
	console.log(req);
	Goal
   .findByIdAndUpdate(req.params.id, {$push: {actions: {name: req.body.name, dueDate: req.body.dueDate}}}, {new: true})
    .then(goal => {
        res.status(200).json(goal);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

// ACTION - update an action
app.put('/actions/:id', jwtAuth, (req, res) => {
	
	const updatedData = {}
	
	const updateableFields = ["name", "dueDate", "completedDate"]

	updateableFields.forEach(field => {
		if (field in req.body) {
			updatedData[field] = req.body[field];
		}
	});

	Goal
	.findOne({"actions._id": req.params.id})
	.then((goal) => {
		let action = goal.toObject().actions.find((action) => {
			return action._id.toString() === req.params.id
		});
		return action;
	}).then((action)=> {
		//console.log(action);
		delete action._id;
		return Goal.findOneAndUpdate({"actions._id": req.params.id}, {$set: {"actions.$": Object.assign({}, action, updatedData)}}, {new: true});
	}).then((goal) => {
		//TODO return just updated action rather than whole goal
		console.log(goal);
		res.status(200).json(goal);
	});
});

app.delete('/actions/:id', (req, res) => {

	Goal
	.findOneAndUpdate({"actions._id": req.params.id}, {$pull: {actions: {_id: req.params.id}}}, {new: true})
	.populate("actions")
	.then((goal) => {
		console.log(goal);
		res.status(200).json(goal);
	});

});


// RUN/CLOSE SERVER 
let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

// EXPORTS

module.exports = { runServer, app, closeServer };