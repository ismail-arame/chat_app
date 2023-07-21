import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  notifications: [],
};

//functions
export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/conversation`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = "";
      state.conversations = action.payload;
    });
    builder.addCase(getConversations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
  },
});

export const { setActiveConversation } = chatSlice.actions;
export default chatSlice.reducer;
