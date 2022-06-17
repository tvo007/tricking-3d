import express from "express";
import {
	checkPassword,
	deleteUser,
	findAll,
	findOrCreate,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

export const userRoutes = express.Router();

userRoutes
	.route("/user")
	.get(verifyJWT, findAll)
	.post(findOrCreate)
	.delete(deleteUser);

userRoutes.route("/user/login").post(checkPassword);
