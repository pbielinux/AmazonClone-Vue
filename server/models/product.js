import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
	title: String,
	description: String,
	photo: String,
	price: Number,
	stockQuantity: Number,
	rating: [ Number ]
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;
