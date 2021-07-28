import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	headline: String,
	body: String,
	rating: Number,
	photo: String,
	productID: { type: Schema.Types.ObjectId, ref: 'product'},
	user: { type: Schema.Types.ObjectId, ref: 'user'}
});

const ReviewModel = mongoose.model('review', ReviewSchema);

export default ReviewModel;
