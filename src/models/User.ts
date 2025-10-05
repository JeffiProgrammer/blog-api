import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	passwordHash: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, unique: true, lowercase: true, index: true },
		passwordHash: { type: String, required: true },
	},
	// Add timestamps for createdAt and updatedAt
	{ timestamps: true },
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
