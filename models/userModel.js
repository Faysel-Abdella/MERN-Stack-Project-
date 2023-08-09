import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.methods.withOutPassword = function () {
  //Must use function key word
  let obj = this.toObject();
  //this refer to the user created base on this Schema model
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
