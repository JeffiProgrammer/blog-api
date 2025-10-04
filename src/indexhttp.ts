// Create our first http server
import { createServer } from "node:http";

const server = createServer((req, res) => {
	// Set header so the browsers can read our response
	res.setHeader("Content-type", "application/json");

	// Handle the request
	if (req.url === "/") {
		res.writeHead(200);
		res.end(JSON.stringify({ message: "Hello World from Blog-API" }));
	}
});

server.listen(3000, () => {
	console.log(`Server is running on port : ${3000}`);
});
