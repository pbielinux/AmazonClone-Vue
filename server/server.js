import express from 'express'; // Http requests
import morgan from 'morgan';  // Logger for http

const app = express();

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
	console.log(request.body.name);
});

app.listen(3333, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Listening on PORT", 3333)
	};
});
