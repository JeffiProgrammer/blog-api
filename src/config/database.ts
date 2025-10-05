import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
	try {
		const mongoURI = process.env.MONGODB_URI;

		if (!mongoURI) {
			throw new Error("MONGODB_URI is not defined in the environment variables");
		}
		await mongoose.connect(mongoURI);
		console.log("Connected to MongoDB");

		// Close the MongoDB connection when the app is terminated
		process.on("SIGINT", async () => {
			await mongoose.connection.close();
			console.log("MongoDB connection closed through app termination");
			process.exit(0);
		});
	} catch (_error) {
		throw new Error(`Error connecting to MongoDB: ${_error}`);
	}
};
export const disconnectDB = async (): Promise<void> => {
	try {
		await mongoose.connection.close();
	} catch (_error) {}
};
