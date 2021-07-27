import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	address: { type: Schema.Types.ObjectId, ref: 'address' } // A relationship with another address schema
});

// Run the encryption before save to the DB
UserSchema.pre('save', function(next) {
	let user = this;
	// Verify if the password was modified or is newly created then encrypt the password
	if (this.isModified('password') || this.isNew) {
		// 1. Generate 10 Long random characters
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				return next(err);
			};
			// 2. Mix the 10 characters with the user's password
			// 3. Output the Hash
			bcrypt.hash(user.password, salt, null, function(err, hash) {
				if (err) {
				return next(err);
				};
				// 4. set the user password to hash
				user.password = hash;
				// 5. Operation is done, move on!
				next();
			});
		});
	} else {
		return next();
	};
});

// Export the UserSchema - A BluePrint of user object
const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
