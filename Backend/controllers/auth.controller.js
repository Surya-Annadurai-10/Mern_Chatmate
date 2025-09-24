import UserModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { upstreamClient } from "../lib/streamChat.js";

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email , "email" , password , "password");
    
    //if email and password is empty
    if (!email || !password)
      return res
        .status(401)
        .json({ success: false, message: "Fields should not empty" });
    const user = await UserModel.findOne({ email: req.body.email });
    if (user.email != email)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });

    const { password: pass, ...safeUserData } = user._doc;
    const result = await bcrypt.compare(req.body.password, pass);
    if (!result)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    if (result) {
      const payload = {
        id: user._id,
        name: user.username,
        email: user.email,
      };

      const options = {
        expiresIn: "7d",
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
      });
      res.status(200).json({
        message: "Login successful",
        user: safeUserData,
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Error while logging in",
      error: err.message,
    });
  }
};

export const SignupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log({ username, email, password }, "Signup data");

    if (!username) {
      console.log(username, "username error");

      return res
        .status(401)
        .json({ success: false, message: "username should not be empty" });
    }
    if (password.length < 6){
      console.log(password.length , "password lenght error" );
      
      return res.status(401).json({
        success: false,
        message: "pasword should be more 6 charcters",
      
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      console.log(email , "email error");
      
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await UserModel.findOne({ email: email });
    if (user){
      console.log(user , "user already exists");
      
      return res
        .status(401)
        .json({ success: false, message: "This email is already an user" });
    }
    const idx = Math.floor(Math.random() * 100) + 1;
    const profilePic = `https://avatar.iran.liara.run/public/${idx}.png`;

    const userData = {
      username,
      email,
      password,
      profilePicture: profilePic,
    };

    const result = await UserModel.create(userData);

    try {
      await upstreamClient({
        id: result._id.toString(),
        name: result.username,
        image: result.profilePicture || "",
      });
      console.log(`StreamUser created successfully for ${result.username}`);
    } catch (error) {
      console.error("Error while creating the user in streamiy", error);
    }

    // JWT Token creation
    const payload = {
      id: parseInt(Date.now()),
      username: username,
      email: email,
    };

    const options = {
      expiresIn: "1d",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV == "production", // prevents HTTP requests
      httpsOnly: true, //prevents XSS attacks
      sameSite: "strict", // prevents CRSF attacks
    });

    res.status(200).json({
      success: true,
      message: "signup successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error occured while signing up",
      err: error.message,
    });
  }
};

export const LogoutController = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logout successful",
  });
};

export const OnboardingController = async (req, res) => {
  const { username, learningLanguage, location, bio, nativeLanguage } =
    req.body;

  if (!username || !learningLanguage || !location || !bio || !nativeLanguage) {
    return res.status(401).json({
      success: false,
      message: "All fields are Required",
      emptyFields: [
        !username && "username",
        !learningLanguage && "learningLanguage",
        !location && "location",
        !bio && "bio",
        !nativeLanguage && "nativeLanguage",
      ].filter(Boolean),
    });
  }

  try {
    const userData = req.user;
    // console.log(userData , "userData");

    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "User Not found",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: userData._id },
      {
        ...req.body,
        onBoarded: true,
      },
      { new: true }
    );

    // console.log(updatedUser , "UpdatedUser");

    try {
      await upstreamClient({
        id: updatedUser._id,
        name: updatedUser.username,
        image: updatedUser.profilePicture || "",
      });

      console.log("Upstreamed successfully for ", updatedUser._id);
    } catch (error) {
      console.log("Error while upstreaming", error);
    }

    res.status(200).json({
      success: true,
      message: "Data updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};
