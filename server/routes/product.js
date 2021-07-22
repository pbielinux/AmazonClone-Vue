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
		product.price = request.body.price;
		product.photo = request.file.location;
		product.stockQuantity = request.body.stockQuantity;
		product.ownerID = request.body.owner;
		product.categoryID = request.body.category;

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
router.get('/products', async (request, response) => {
	try {
		let products = await ProductModel.find();

		response.json({
			success: true,
			products: products
		});
	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		});
	}
});

// GET request - get a single product
router.get('/products/:id', async (request, response) => {
	try {
		let product = await ProductModel.findOne({ _id: request.params.id });

		response.json({
			success: true,
			product: product
		});
	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		});
	}
});

// PUT request - update a single product
router.put('/products/:id', Upload.single('photo'), async (request, response) => {
	try {
		let updatedProduct = await ProductModel.findOneAndUpdate(
			{ _id: request.params.id },
			{
				$set: {
					category: request.body.categoryID,
					title: request.body.title,
					description: request.body.description,
					photo: request.file.location,
					price: request.body.price,
					owner: request.body.ownerID,
					stockQuantity: request.body.stockQuantity
				}
			},
			{ upsert: true }
		);

		response.json({
			success: true,
			updatedProduct: updatedProduct
		});
	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		});
	}
});

// DELETE request - delete a single product
router.delete('/products/:id', async (request, response) => {
	try {
		let deletedProduct = await ProductModel.deleteOne({ _id: request.params.id });

		if (deletedProduct) {
			response.json({
				status: true,
				message: 'Successfully deleted'
			});
		}

	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		});
	}
});

export default router;
