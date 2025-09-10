import express from "express";
import "dotenv/config";
import router from "./routes/auth.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json()); // indbuilt middleware to receive the data from the client as json
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth/", router);
app.use("/api" , router);

app.use("/api/user",userRouter);

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
