import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  status: {
    type: String,
    default: "active"
  },
  isActive:{
    type: Boolean,
    default: true
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
});
async function enctryptPassword(next) {
  const user =this
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Password Encrypt Error");
  }
}
UserSchema.pre("save", enctryptPassword); 
UserSchema.pre("updateOne", enctryptPassword);

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("users", UserSchema);