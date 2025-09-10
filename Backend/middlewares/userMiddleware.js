import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";

export const ProtectedRoute =async (req, res, next) => {
  const cookie = req.cookies.token;

  if(!cookie) return res.status(401).json({success : false , message : "No token Present"})

  //   console.log(token, "token");

  const result = jwt.verify(cookie, process.env.JWT_SECRET);
  if(!result) return res.status(401).json({
    success : false,
    message : "Unauthorized user"
  })  

  try {
    const findUser = await UserModel.find({email : result.email});
   req.user = findUser[0];
   console.log(req.user , "req user");
   
  next();
  } catch (error) {
    return res.status (401).json({
      success : false,
      message : "User Not Authorized"
    })
  }
 
};
