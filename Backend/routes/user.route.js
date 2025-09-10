import express from "express"
import { ProtectedRoute } from "../middlewares/userMiddleware.js";
import { AcceptFriendRequestController, GetFriendRequestController, GetFriendsController, GetRecommendedFriendsController, OngoingGetFriendRequestController, SendFriendRequestController } from "../controllers/user.controller.js";
const app = express();
const userRouter = express.Router();

userRouter.use(ProtectedRoute);

userRouter.get("/getfriends" , GetFriendsController);
userRouter.get("/getrecommendedfriends" , GetRecommendedFriendsController);

userRouter.post ("/friend-request/:id" , SendFriendRequestController);
userRouter.put ("/friend-request/:id/accept" , AcceptFriendRequestController);

userRouter.get("/friend-requests" , GetFriendRequestController);
userRouter.get("/ongoing-friend-requests" , OngoingGetFriendRequestController);
export default userRouter;