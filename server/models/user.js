import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	address: { type: Schema.Types.ObjectId, ref: 'Address' } // A relationship with another address schema
});

// Export the UserSchema - A BluePrint of user object
const newUser = mongoose.model('User', UserSchema);

export default newUser;
