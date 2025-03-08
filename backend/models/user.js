import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    role: { type: String, enum: ["Student", "Employer", "College", "Admin"], required: true },
    profilePicture: { type: String, default: "" }, 
    location: { type: String, default: "" },       
    isVerified: { type: Boolean, default: false },  
    bio: { type: String, default: "" },           
  },
  { timestamps: true }
);

// Use "User" with a capital "U" to match Mongoose conventions
export default model("User", userSchema);
