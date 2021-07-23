import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	type: { type: String, unique: true, require: true }
});

const CategoryModel = mongoose.model('category', CategorySchema);

export default CategoryModel;
