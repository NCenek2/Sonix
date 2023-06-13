import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk("/createSox", async (sox) => {
  try {
    const res = await axios.post("/api/sox/create", { sox });
    return res;
  } catch (e) {
    console.log("error: ", e);
  }
});

export const readPosts = createAsyncThunk("/readSoxs", async () => {
  try {
    const res = await axios.get("/api/sox/read");
    return res;
  } catch (err) {
    return err.message;
  }
});

export const reactionPost = createAsyncThunk("/reactionSox", async (data) => {
  let { kind: reactionType } = data;
  delete data["kind"];
  try {
    const res = await axios.patch(`/api/sox/${reactionType}`, {
      postId: data.postId,
      userId: data.userId,
    });
    return res;
  } catch (e) {
    console.log("error: ", e);
  }
});

export const patchPost = createAsyncThunk("/patchPost", async (data) => {
  try {
    const res = await axios.put(`/api/sox/post/patch`, data);
    return res;
  } catch (e) {
    console.log("error: ", e);
  }
});

export const deletePost = createAsyncThunk("/deleteSox", async (soxId) => {
  try {
    const res = await axios.delete("/api/sox/delete", { data: { soxId } });
    return res;
  } catch (e) {
    console.log("error: ", e);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    posts: [],
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(readPosts.pending, (state, action) => {
        state.status = "loading";
        state.posts = [];
      })
      .addCase(readPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "PAYLOAD readPosts", action.payload.data);
        state.posts = action.payload.data || [];
      })
      .addCase(readPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
        state.posts = [...state.posts];
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "PAYLOAD createPost", action.payload.data);
        state.posts = action.payload.data || [];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(reactionPost.pending, (state, action) => {
        state.status = "loading";
        state.posts = [...state.posts];
      })
      .addCase(reactionPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "PAYLOAD FULFILLED");
        state.posts = [...action.payload.data] || [];
      })
      .addCase(reactionPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(patchPost.pending, (state, action) => {
        state.status = "loading";
        state.posts = null;
      })
      .addCase(patchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload.data, "patchPost payload");
        // console.log(action.payload, "PAYLOAD patchPost", action.payload.data);
        state.posts = action.payload.data || [];
      })
      .addCase(patchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
        state.posts = [...state.posts];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "PAYLOAD DELETE");
        state.posts = action.payload.data || [];
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
