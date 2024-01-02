import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostType } from "../types";

export const viewPost = createAsyncThunk(
  "/viewPost",
  async (_id: string): Promise<PostType> => {
    try {
      const res = await axios.get(`/api/sox/post/view/${_id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export const editPost = createAsyncThunk(
  "/editPost",
  async (postId: string): Promise<PostType> => {
    try {
      const res = await axios.get(`/api/sox/post/edit/${postId}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

type PostState = {
  status: "idle" | "pending" | "succeeded" | "failed";
  post: null | PostType;
  error: string;
};

const initialState: PostState = {
  status: "idle",
  post: null,
  error: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(viewPost.pending, (state, action) => {
        state.status = "pending";
        state.post = null;
      })
      .addCase(viewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload || {};
      })
      .addCase(viewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Error occured when trying to view the post";
      })
      .addCase(editPost.pending, (state, action) => {
        state.status = "pending";
        state.post = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload || {};
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Error occured when trying to edit the post";
      });
  },
});

export default postSlice.reducer;
