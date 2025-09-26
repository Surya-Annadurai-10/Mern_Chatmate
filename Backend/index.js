import express from "express";
import "dotenv/config";
import router from "./routes/auth.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import cors from "cors"
import chatRouter from "./routes/chat.route.js";
import path from "path"
const app = express();

app.use(express.json()); // indbuilt middleware to receive the data from the client as json
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
  origin :"http://localhost:5173",
  credentials : true // allow frontend to send the cookies
}))

// app.use("/api" , router);
app.use("/api/auth", router);
app.use("/api/user",userRouter);
app.use("/api/connect",chatRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname , "../frontend/react_vite/dist")));

  app.get("*" , (req,res) =>{ 
    res.sendFile(path.join(__dirname , "../frontend","react_vite","dist","index.html"))
  })
}

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
     console.log("db connected successfully");
    
  })
  .catch((err) => {
   console.log("Error while  connecting to db" , err);
  });

app.listen(PORT, () => {
  console.log(`Started listening Port :${PORT}`);
});
