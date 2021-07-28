import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import VerifyToken from '../middlewares/verify-token.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Signup Route
router.post("/auth/signup", async (request, response) => {
	// 1. Check is email or password of the body is empty
	if (!request.body.email || !request.body.password) {
		response.json({
			success: false,
			message: "Please enter email or password"
		});
	} else {
		try {
			// 2. Create a new User object
			let newUser = new UserModel();
			newUser.name = request.body.name;
			newUser.email = request.body.email;
			newUser.password = request.body.password;

			// 3. Go to the pre-save function to generate the hash and save to the password
			await newUser.save();

			// 4. Save the user object into a Json Web Token
			let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
				expiresIn: 604800		// 1 week
			});

			response.json({
				success: true,
				token: token,
				message: "Successfully created a new user"
			})

		} catch (err) {
			response.status(500).json({
				success: false,
				message: err.message
			});
		}
	};
});

// Profile Route
router.get("/auth/user", VerifyToken, async (request, response) => {
	try {
		let foundUser = await UserModel.findOne({ _id: request.decoded._id});

		if (foundUser) {
			response.json({
				success: true,
				user: foundUser
			});
		}
	} catch (err) {
		response.json({
			success: false,
			message: err.message
		});
	}
});

// Login Router
router.post("/auth/login", async (request, response) => {
	try {
		// 1. Check if the user email exists on the DB
		let foundUser = await UserModel.findOne({ email: request.body.email });

		// 2.1 If the user does not exist on DB, response error
		if (!foundUser) {
			response.status(403).json({
				success: false,
				message: "Authentication failed, User not found"
			});
		} else { // 2.2 If the user exists ...
			// 3.1 Check if the password is correct
			if (foundUser.comparePassword(request.body.password)) {
				// 4. Wrap the user object in a token
				let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
					expiresIn: 604800		// 1 week
				});

				// 5. Finally response and store the token in the browser
				response.json({
					success: true,
					token: token
				});
			} else { // 3.2 If the password is not correct, response error
				response.status(403).json({
					success: false,
					message: "Authentication failed, Wrong password!"
				});
			};
		};
	} catch (err) {
		response.json({
			success: false,
			message: err.message
		});
	};
});

// Update profile
router.put("/auth/user", VerifyToken, async(request, response) => {
	try {
		let foundUser = await UserModel.findOne({ _id: request.decoded._id });

		if (foundUser) {
			if (request.body.name) foundUser.name = request.body.name;
			if (request.body.email) foundUser.email = request.body.name;
			if (request.body.password) foundUser.password = request.body.password;

			await foundUser.save();

			response.json({
				success: true,
				Message: "Successfully updated user"
			});
		};
	} catch (err) {
		response.status(500).json({
			success: false,
			message: "Authentication failed, Wrong password!"
		});
	}
});

export default router;
