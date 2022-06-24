import mongoose from "mongoose";
import base64Image from "../config/defaultImage.js";

const userSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      reqired: true,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    profileImage: {
      type: String,
      default: base64Image.noProfile,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
