import express from 'express'; // Http requests
import morgan from 'morgan';  // Logger for http
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/product.js';
import categoryRouter from './routes/category.js';
import ownerRouter from './routes/owner.js';
import cors from 'cors';

dotenv.config();

const app = express();

mongoose.connect(
	process.env.DATABASE, // .env To protect the sensitive information
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to the Database');
	};
});

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// require APIs
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', ownerRouter);

app.listen(3333, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Listening on PORT", 3333)
	};
});
