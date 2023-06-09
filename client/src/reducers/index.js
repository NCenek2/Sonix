import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";
export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    post: postReducer,
  },
});
