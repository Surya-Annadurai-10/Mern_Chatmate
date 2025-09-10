import express from "express";
import { ProtectedRoute } from "../middlewares/userMiddleware";
import { generateStreamClientController } from "../controllers/chat.controller";


const app = express();
const chatRouter = express.Router();

chatRouter.get("/chat",ProtectedRoute, generateStreamClientController);