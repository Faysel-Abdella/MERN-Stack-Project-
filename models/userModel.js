import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    Type: String,
  },
  email: {
    Type: String,
  },
  password: {
    Type: String,
  },
  lastName: {
    Type: String,
    default: "lastName",
  },
  location: {
    Type: String,
    default: "my city",
  },
  role: {
    Type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export default mongoose.model("User", userSchema);
