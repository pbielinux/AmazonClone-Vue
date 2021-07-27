import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Signup Router
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

export default router;
