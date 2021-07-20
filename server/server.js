import express from 'express'; // Http requests
import morgan from 'morgan';  // Logger for http
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import newUser from './models/user.js';
import newProduct from './models/product.js';

dotenv.config();

const app = express();

mongoose.connect(
	process.env.DATABASE, // T o protect the sensitive information
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to the Database');
	};
});

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET - Retrieve data from the server
app.get('/', (request, response) => {
	response.json("Hello amazon clone");
});

// POST - Send data from front to backend
app.post('/', (request, response) => {
	let user = new newUser();
	user.name = request.body.name;
	user.email = request.body.email;
	user.password = request.body.password;

	user.save((err) => {
		if (err) {
			response.json(err);
		} else {
			response.json('successfully saved');
		};
	});
});

app.listen(3333, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Listening on PORT", 3333)
	};
});
