import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
	name: String,
	about: String,
	photo: String
});

const newOwner = mongoose.model('Category', OwnerSchema);

export default newOwner;
