import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../types";

export const fetchUser = createAsyncThunk(
  "/userData/reqStatus",
  async (): Promise<UserType> => {
    try {
      const res = await axios.get("/api/current_user");
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

type AuthState = {
  data: null | boolean | UserType;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
};

const initialState: AuthState = {
  data: null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "pending";
        state.data = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload || false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ??
          "An error has occured while fetching the user's data ";
      });
  },
});

export default authSlice.reducer;
