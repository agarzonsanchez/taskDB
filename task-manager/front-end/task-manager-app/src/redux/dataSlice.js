import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/v1/tasks");
    return response.data;
  } catch (error) {
    return { error: error };
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [], // State to hold the data
    status: "idle", // Can be 'idle', 'loading', 'succeeded', or 'failed'
    error: null, // Error handling
  },
  reducers: {}, // Additional reducers can go here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading"; // Set loading state
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Store the fetched data in state
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Store any error message
      });
  },
});

export default dataSlice.reducer;
