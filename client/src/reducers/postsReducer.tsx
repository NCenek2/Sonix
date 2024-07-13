import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostType } from "../types";

export const createPost = createAsyncThunk(
  "/createSox",
  async (sox: string): Promise<PostType[]> => {
    try {
      const res = await axios.post("/api/sox/create", { sox });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export const readPosts = createAsyncThunk(
  "/readSoxs",
  async (): Promise<PostType[]> => {
    try {
      const res = await axios.get("/api/sox/read");
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

type ReactionType = {
  kind?: string;
  postId: string;
  userId: string;
};

export const reactionPost = createAsyncThunk(
  "/reactionSox",
  async (data: ReactionType): Promise<PostType[]> => {
    let { kind: reactionType } = data;
    delete data["kind"];

    try {
      const res = await axios.patch(`/api/sox/${reactionType}`, {
        postId: data.postId,
        userId: data.userId,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

type PatchPostType = {
  message: string;
  postId: string;
};

export const patchPost = createAsyncThunk(
  "/patchPost",
  async (data: PatchPostType): Promise<PostType[]> => {
    try {
      const res = await axios.put(`/api/sox/post/patch`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export const deletePost = createAsyncThunk(
  "/deleteSox",
  async (soxId: string): Promise<PostType[]> => {
    try {
      console.log(soxId, "SoxId");
      const res = await axios.delete("/api/sox/delete", {
        data: { soxId },
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

type PostsState = {
  status: "idle" | "pending" | "succeeded" | "failed";
  posts: PostType[];
  error: string;
};

const initialState: PostsState = {
  status: "idle",
  posts: [],
  error: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(readPosts.pending, (state, action) => {
        state.status = "pending";
        state.posts = [];
      })
      .addCase(readPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload || [];
      })
      .addCase(readPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Error occured when attempting to read posts";
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = "pending";
        state.posts = [...state.posts];
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload || [];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ??
          "Error occured when attempting to create post";
      })
      .addCase(reactionPost.pending, (state, action) => {
        state.status = "pending";
        state.posts = [...state.posts];
      })
      .addCase(reactionPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...action.payload] || [];
      })
      .addCase(reactionPost.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ??
          "Error occured when attempting to react to a post";
      })
      .addCase(patchPost.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(patchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload || [];
      })
      .addCase(patchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ??
          "Error occured when attempting to patch a post";
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "pending";
        state.posts = [...state.posts];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload || [];
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ??
          "Error occured when attempting to delete a post";
      });
  },
});

export default postsSlice.reducer;
