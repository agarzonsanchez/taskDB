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

export const getDataById = createAsyncThunk(
  "data/getDataById",
  async (taskId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/tasks/${taskId}`
      );
      return response.data;
    } catch (error) {
      return { error: error };
    }
  }
);

export const postData = createAsyncThunk("data/postData", async (newTask) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/tasks",
      newTask
    );
    return response.data;
  } catch (error) {
    return { error: error };
  }
});

export const deleteTask = createAsyncThunk(
  "data/deleteTask",
  async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/tasks/${taskId}`);
      return taskId; // Return task ID to remove from the state
    } catch (error) {
      throw error;
    }
  }
);

export const updateTask = createAsyncThunk(
  "data/updateTask",
  async ({ taskId, updatedTask }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/tasks/${taskId}`,
        updatedTask
      );
      return response.data; // Return the updated task
    } catch (error) {
      throw error;
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [], // State to hold the data
    selectedTask: null, // State to hold the task fetched by ID
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
      })
      .addCase(getDataById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedTask = action.payload; // Store the specific task in selectedTask
      })
      .addCase(getDataById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postData.fulfilled, (state, action) => {
        console.log("New task added:", action.payload);
        state.status = "succeeded";
        state.items.tasks.push(action.payload.task); // Add the new task to the state
      })
      .addCase(postData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((task) => task.id !== action.payload); // Remove task by ID
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload; // Update the task in the state
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
