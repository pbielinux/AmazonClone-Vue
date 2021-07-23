import express from 'express';
import OwnerModel from '../models/owner.js';
import Upload from '../middlewares/upload-photo.js'

const router = express.Router();

/*OwnerSchema =
	name: String,
	about: String,
	photo: String */

// POST request - create a new Owner
router.post('/owners', Upload.single('photo'), async (request, response) => {
	try {
		let owner = new OwnerModel();
		owner.name = request.body.name;
		owner.about = request.body.about;
		owner.photo = request.file.location;

		await owner.save();

		response.json({
			success: true,
			message: 'Successfully saved new Owner'
		});

	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		});
	}
});

// GET request - List all owners
router.get('/owners', async (request, response) => {
	try {
		let owners = await OwnerModel.find();

		response.json({
			success: true,
			owners: owners
		});

	} catch (err) {
		response.status(500).json({
			success: false,
			message: err.message
		});
	}
});

export default router;
