import express from "express";
import { LoginController, LogoutController, OnboardingController, SignupController } from "../controllers/auth.controller.js";
import { ProtectedRoute } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/login" , LoginController);
router.post("/signup" , SignupController);
router.post("/logout" , LogoutController);
router.post("/onboarding",ProtectedRoute , OnboardingController);




router.get("/me",ProtectedRoute, (req , res)=>{
    return res.status(200).json ({
      message : "from me",
        success : true,
        user : req.user
    })
})

export default router;