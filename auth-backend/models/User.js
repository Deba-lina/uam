import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,

  lastName: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: String,

  site: String,

  team: String,

  teamRole: String

});

const User = mongoose.model("User", userSchema);

export default User;