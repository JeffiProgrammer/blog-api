import dotenv from "dotenv";
import express from "express";
import SwaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/database";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// Swagger
app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

// Auth Routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
	console.log(`Server is runnig on port : http://localhost:${port}`);
});

connectDB().catch((_error) => {
	console.log(_error);
});
