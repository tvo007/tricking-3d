import express from "express";

import { captureUser, getCaptures } from "../controllers/capture.controller.js";

export const captureRoutes = express.Router();

captureRoutes.post("/", captureUser);
captureRoutes.get("/:userid", getCaptures);
