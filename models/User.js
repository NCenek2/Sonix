const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  name: String,
});

mongoose.model("users", UserSchema);
