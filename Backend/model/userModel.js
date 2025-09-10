import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  learningLanguage :{
    type:String,
    default : ""
  },
   nativeLanguage :{
    type:String,
    default : ""
  },
  profilePicture : {
    type : String,
    default : ""
  },
  location :{
    type : String,
    default : ""
  }
  ,
  bio :{
    type : String,
    default: ""
  },
  onBoarded :{
    type:Boolean,
    default : false
  }
  ,
  friends : [
    {
      type: String,
      id:mongoose.Schema.Types.ObjectId,
       ref : "User"
    },
   
  ]
},{
  timestamps : true
});


UserSchema.pre("save" , async function (next) {
  if(!this.isModified("password")) return next();
  try {
    
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(this.password , salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
})
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;