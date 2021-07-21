import express from 'express';
import ProductModel from '../models/product.js';
import Upload from '../middlewares/upload-photo.js'

const router = express.Router();

/* ProductSchema=
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
	title: String,
	description: String,
	photo: String,
	price: Number,
	stockQuantity: Number,
	rating: [ Number ] */

// POST request - create a new product
router.post('/products', Upload.single('photo'), async (request, response) => {
	try {
		let product = new ProductModel();
		product.title = request.body.title;
		product.description = request.body.description;
		product.photo = request.file.location;
		product.stockQuantity = request.body.stockQuantity;

		await product.save();

		response.json({
			status: true,
			message: 'Successfully saved'
		});
	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		});
	};
});

// GET request - get all products


// GET request - get a single product


// PUT request - update a single product


// DELETE request - delete a single product

export default router;
