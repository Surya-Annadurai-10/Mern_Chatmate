import express from "express";
// import { ProtectedRoute } from "../middlewares/userMiddleware";
import { generateStreamClientController } from "../controllers/chat.controller.js";
import { ProtectedRoute } from "../middlewares/userMiddleware.js";

const chatRouter = express.Router();

chatRouter.get("/chat",ProtectedRoute, generateStreamClientController);

export default chatRouter;