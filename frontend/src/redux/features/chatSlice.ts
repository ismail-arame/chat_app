import { conversationType } from "@/types/conversationType";
import { messageType } from "@/types/messageType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  status: string;
  error: string;
  conversations: conversationType[];
  activeConversation: conversationType;
  messages: messageType[];
  notifications: any;
} = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {
    _id: "",
    name: "",
    picture: "",
    isGroup: false,
    users: [],
    latestMessage: {},
  },
  messages: [],
  notifications: [],
};

type valuesType = {
  token: string;
  receiver_id: string;
};

type messageEndpointValuesType = {
  token: string;
  conversation_id: string;
};

type sendMessageValuesType = {
  token: string;
  message: string;
  conversation_id: string;
  files: any;
};

type updateMessageStatusValuesType = {
  token: string;
  status: string;
};

/* _*_*_*_*_*_*_*_*_*_*_* functions *_*_*_*_*_*_*_*_*_*_* _ */

//get conversations function
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

//get created user conversation function
export const getCreatedUserConversation = createAsyncThunk(
  "conversation/created_user",
  async (values: valuesType, { rejectWithValue }) => {
    const { token, receiver_id } = values;
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/conversation/${receiver_id}`,
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

// open or create a conversation
export const open_create_conversation = createAsyncThunk(
  "conversation/open_create",
  async (values: valuesType, { rejectWithValue }) => {
    const { token, receiver_id } = values;
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/conversation`,
        {
          receiver_id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// get conversation messages
export const getConversationMessages = createAsyncThunk(
  "messages/get",
  async (values: messageEndpointValuesType, { rejectWithValue }) => {
    const { token, conversation_id } = values;
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/message/${conversation_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// send message
export const sendMessage = createAsyncThunk(
  "message/send",
  async (values: sendMessageValuesType, { rejectWithValue }) => {
    const { token, message, conversation_id, files } = values;
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/message`,
        {
          message,
          conversation_id,
          files,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// update message status
export const updateMessageStatus = createAsyncThunk(
  "message/updateStatus",
  async (values: updateMessageStatusValuesType, { rejectWithValue }) => {
    const { token, status } = values;
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/message/updateMessageStatus`,
        {
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

/* _*_*_*_*_*_*_*_*_*_*_* functions *_*_*_*_*_*_*_*_*_*_* _ */

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<conversationType>) => {
      state.activeConversation = action.payload;
    },
    setMessages: (state, action: PayloadAction<messageType[]>) => {
      state.messages = action.payload;
    },
    updateMessageStatusToRead: (state) => {
      const lastIndex = state.messages.length - 1;
      if (state.messages[lastIndex]) {
        state.messages[lastIndex].messageStatus = "read";
      }
    },
    updateLatestMessageStatusToRead: (state, action: PayloadAction<string>) => {
      //update latest message status to read
      const conversationId = action.payload;
      const updatedConversations = state.conversations.map((conversation) => {
        if (conversation._id === conversationId) {
          return {
            ...conversation,
            latestMessage: {
              ...conversation.latestMessage,
              messageStatus: "read",
            },
          };
        }
        return conversation;
      });
      state.conversations = updatedConversations;
    },
    updateMessagesAndConversations: (
      state,
      action: PayloadAction<messageType>
    ) => {
      // const updatedState = { ...state }; // Create a new state object
      // update the messages only for the appropriate message conversation not any active conversation
      let convo = state.activeConversation;
      if (convo._id === action.payload.conversation._id) {
        //make the messageStatus = "read"
        const updatedMessage: messageType = {
          ...action.payload,
          messageStatus: "read", // Update the messageStatus here
        };
        state.messages = [...state.messages, updatedMessage];
        // updatedState.messages = [...state.messages, updatedMessage];
      }

      //update conversations
      let conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      //filtering all conversations that are not this conversation
      const newConvos = [...state.conversations].filter(
        (c) => c._id !== conversation._id
      );
      //add the latest conversation to the beginning
      newConvos.unshift(conversation);
      // updatedState.conversations = newConvos;
      state.conversations = newConvos;

      // return updatedState;
    },
  },
  extraReducers: (builder) => {
    /* ----- getConversations ----- */
    builder.addCase(getConversations.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      getConversations.fulfilled,
      (state, action: PayloadAction<conversationType[]>) => {
        state.status = "succeeded";
        state.error = "";
        state.conversations = action.payload;
      }
    );
    builder.addCase(getConversations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });

    /* ----- getCreatedUserConversation ----- */
    builder.addCase(getCreatedUserConversation.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      getCreatedUserConversation.fulfilled,
      (state, action: PayloadAction<conversationType>) => {
        state.status = "succeeded";
        state.error = "";
        let doIneedToPush = true;
        state.conversations.forEach((conversation) => {
          if (conversation._id === action.payload._id) {
            doIneedToPush = false;
          }
        });
        if (doIneedToPush) {
          state.conversations.push(action.payload);
        }
      }
    );
    builder.addCase(getCreatedUserConversation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });

    /* ----- open_create_conversation ----- */
    builder.addCase(open_create_conversation.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      open_create_conversation.fulfilled,
      (state, action: PayloadAction<conversationType>) => {
        state.status = "succeeded";
        state.error = "";
        state.activeConversation = action.payload;
      }
    );
    builder.addCase(open_create_conversation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
    /* ----- get conversation messages ----- */
    builder.addCase(getConversationMessages.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      getConversationMessages.fulfilled,
      (state, action: PayloadAction<messageType[]>) => {
        state.status = "succeeded";
        state.error = "";
        state.messages = action.payload;
      }
    );
    builder.addCase(getConversationMessages.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
    /* ----- send Message ----- */
    builder.addCase(sendMessage.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      sendMessage.fulfilled,
      (state, action: PayloadAction<messageType>) => {
        state.status = "succeeded";
        state.error = "";
        state.messages = [...state.messages, action.payload];
        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        //filtering all conversations that are not this conversation
        const newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation._id
        );
        //add the latest conversation to the beginning
        newConvos.unshift(conversation);
        state.conversations = newConvos;
      }
    );
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
    /* ----- Update Message Status ----- */
    builder.addCase(updateMessageStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      updateMessageStatus.fulfilled,
      (state, action: PayloadAction<messageType>) => {
        state.status = "succeeded";
        state.error = "";
      }
    );
    builder.addCase(updateMessageStatus.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as any;
    });
  },
});

export const {
  setActiveConversation,
  setMessages,
  updateMessageStatusToRead,
  updateLatestMessageStatusToRead,
  updateMessagesAndConversations,
} = chatSlice.actions;
export default chatSlice.reducer;
