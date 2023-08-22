import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "USER",
  },
});

const Users = mongoose.model("users", usersSchema);
export default Users;
