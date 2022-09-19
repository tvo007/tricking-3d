import express from "express";
import {
	claimCombo,
	claimTrick,
	unclaimCombo,
	unclaimTrick,
} from "../controllers/claimed.contorller.js";
import {
	deleteInteraction,
	getInteractions,
	interact,
} from "../controllers/interactions.controller.js";
import {
	updateProfileInfo,
	updateStatus,
} from "../controllers/profile.contorller.js";
import {
	checkPassword,
	deleteUser,
	findAll,
	findOrCreate,
	getUserInfo,
	getUserInfoById,
	getUserInfoByUUID,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

export const userRoutes = express.Router();

userRoutes.route("/user/login").post(checkPassword);
userRoutes
	.route("/user")
	.get(verifyJWT, findAll)
	.post(findOrCreate)
	.delete(deleteUser);

userRoutes.route("/user/getInfo").get(verifyJWT, getUserInfo);
userRoutes.route("/user/getInfo/:uuid").get(verifyJWT, getUserInfoByUUID);
userRoutes.route("/user/getInfoById").post(getUserInfoById);
userRoutes.route("/user/interact/").post(interact);
userRoutes.route("/user/claimCombo").post(claimCombo);
userRoutes.route("/user/unclaimCombo/:user_id/:combo_id").delete(unclaimCombo);
userRoutes.route("/user/claimTrick").post(claimTrick);
userRoutes.route("/user/unclaimTrick/:user_id/:trick_id").delete(unclaimTrick);
userRoutes.route("/user/profile/status").put(updateStatus);
userRoutes.route("/user/profile/").put(updateProfileInfo);
userRoutes.route("/user/comments/:trick_id").get(getInteractions);
userRoutes.route("/user/comments/:interaction_id").delete(deleteInteraction);
