import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
