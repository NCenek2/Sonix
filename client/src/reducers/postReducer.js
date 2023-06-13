import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const viewPost = createAsyncThunk("/viewPost", async (postId) => {
  try {
    const res = await axios.get(`/api/sox/post/view/${postId.postId}`);
    return res;
  } catch (e) {
    console.log("error: ", e);
  }
});

export const editPost = createAsyncThunk("/editPost", async (postId) => {
  try {
    const res = await axios.get(`/api/sox/post/edit/${postId}`);
    return res;
  } catch (e) {
    console.log("error: ", e);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState: {
    status: "idle",
    post: null,
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(viewPost.pending, (state, action) => {
        state.status = "loading";
        state.post = null;
      })
      .addCase(viewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload.data, "viewPost payload");
        // console.log(action.payload, "PAYLOAD viewPost", action.payload.data);
        state.post = action.payload.data || {};
      })
      .addCase(viewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editPost.pending, (state, action) => {
        state.status = "loading";
        state.post = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload.data, "editPost payload");
        // console.log(action.payload, "PAYLOAD editPost", action.payload.data);
        state.post = action.payload.data || {};
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
