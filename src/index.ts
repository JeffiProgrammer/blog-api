import type { NextFunction, Request, Response } from "express";
import express from "express";

const app = express();

const port = 3000;

app.get("/", (_req: Request, res: Response, _next: NextFunction) => {
	res.status(200).json({ message: "Hello for '/' api call" });
});

app.listen(port, () => {
	console.log(`Server is runnig on port : http://localhost:${port}`);
});
