import express from 'express';
import CategoryModel from '../models/category.js';

const router = express.Router();

// POST request - create a new category
router.post('/categories', async (request, response) => {
	try {
		const category = new CategoryModel();
		category.type = request.body.type;

		await category.save();

		response.json({
			success: true,
			message: 'Successfully saved new category'
		});
	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		});
	};
});

// GET request - get categories
router.get('/categories', async (request, response) => {
	try {
		let categories = await CategoryModel.find();

		response.json({
			success: true,
			categories: categories
		});
	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		})
	}
});

export default router;
