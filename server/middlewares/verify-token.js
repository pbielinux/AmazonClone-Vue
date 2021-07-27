import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = function (request, response, next) {
	// 1. Access the request headers to get the provided token
	let token = request.headers['x-access-token'] || request.headers['authorization'];
	// Sometimes the frontend attach "Bearer " before the token
	let checkBearer = "Bearer ";

	// 2.1 if the token exist ...
	if (token) {
		// 3. If "Bearer " is attached, remove it
		if (token.startsWith(checkBearer)) {
			token = token.slice(checkBearer.length, token.length);
		};
		// 4. Verify the token with the SECRET key
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			// 5.1 If fails, return error
			if (err) {
				response.json({
					success: false,
					message: "Failed to authenticate"
				});
			// 5.2 If the token is correct, use the decoded token
			} else {
				request.decoded = decoded;
				// 6. Operation is done, move on!
				next();
			};
		});
	} else { // 2.2 If the token does not exist...
		response.json({
			success: false,
			message: "No Token provided"
		});
	};
};

export default verifyToken;
