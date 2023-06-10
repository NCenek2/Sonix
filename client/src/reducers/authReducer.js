import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("/userData/reqStatus", async () => {
  try {
    const res = await axios.get("/api/current_user");
    return res;
  } catch (err) {
    return err.message;
  }
});

export const handleSoxSend = async (sox) => {
  try {
    const res = await axios.post("/api/sox", sox);
    return res;
  } catch (err) {
    return err.message;
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data || false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
