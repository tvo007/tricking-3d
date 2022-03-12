import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
const corsOptions = {
	origin: "http://localhost:3000",
};

const requestEndpoint = "https://torquetricking.com/3d/AndrewKohrt.gltf";

app.get("/gltf", cors(corsOptions), async (req, res) => {});

app.get("/getData", cors(corsOptions), async (req, res) => {
	const fetchOptions = {
		method: "GET",
	};
	const response = await fetch(requestEndpoint, fetchOptions);
	const jsonResponse = await response.json();
	res.json(jsonResponse);
});

app.listen(PORT, () =>
	console.log(`I am watching for changes on http://localhost:${PORT}`)
);
