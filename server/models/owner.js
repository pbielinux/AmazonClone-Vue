import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
	name: String,
	about: String,
	photo: String
});

const OwnerModel = mongoose.model('owner', OwnerSchema);

export default OwnerModel;
