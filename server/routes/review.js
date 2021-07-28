import express from 'express';
import ReviewModel from '../models/review.js';
import Upload from '../middlewares/upload-photo.js'
import VerifyToken from '../middlewares/verify-token.js';

const router = express.Router();

// POST review
router.post(
	'/reviews/:productID',
	// Pass an array of middlewares: First VerifyToken and only if its successful goes to upload photo
	[VerifyToken, Upload.single('photo')],
	async (request, response) => {
		try {
			const review = new ReviewModel();
			review.headline = request.body.headline;
			review.body = request.body.body;
			review.rating = request.body.rating;
			review.photo = request.file.photo; // From S3
			review.user = request.decoded._id; // From the token
			review.productID = request.params.productID;

			await ProductModel.update({ $push: review._id });

			const savedReview = await review.save();

			if (savedReview) {
				response.json({
					success: true,
					message: "Successfully Added Review"
				});
			};

		} catch (err) {
			response.status(500).json({
				success: false,
				message: err.message
			});
		}
	}
);

// GET reviews
router.get("/reviews/:productID", async (request, response) => {
	try {
		const productReviews = await ReviewModel.find({
			productID: req.params.productID
		})
			.populate("user")
			.exec();

		response.json({
			success: true,
			reviews: productReviews
		});
	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		});
	}
});

export default router;
