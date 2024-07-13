import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
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
    default: '',
  },
});
