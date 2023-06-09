const mongoose = require("mongoose");
const { Schema } = mongoose;

const SoxSchema = new Schema({
  posterId: String,
  message: String,
  date: String,
  posterName: String,
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
  parentId: {
    type: String,
    default: "",
  },
});

mongoose.model("posts", SoxSchema);
