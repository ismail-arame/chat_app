const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");
const {
  createMessage,
  populateMessage,
  getConversationMessages,
} = require("../services/message.service");
const {
  updatedLatestMessage,
  getConversationById,
  getConversationReceiverId,
} = require("../services/conversation.service");
const { MessageModel } = require("../models");

exports.sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const { message, conversation_id, files } = req.body;
    if ((!message && !files) || !conversation_id) {
      logger.error(
        "invalid data passed to the request, please pass the conversation id and the message or files."
      );
      throw createHttpError.BadRequest("Something went wrong");
    }

    const conversation = await getConversationById(conversation_id);

    const reciever_id = getConversationReceiverId(user_id, conversation.users);

    console.log(
      "online users backend at controller :::: ",
      global.onlineUsersBackend
    );

    const isUserOnline = global.onlineUsersBackend.has(reciever_id);

    const messageData = {
      sender: user_id,
      message,
      messageStatus: isUserOnline ? "delivered" : "sent",
      conversation: conversation_id,
      files: files || [],
    };

    //creating a message document with the messageData in the messages collection
    let newMessage = await createMessage(messageData);

    //populating needed model refs with their referenced models
    let populatedMessage = await populateMessage(newMessage._id);

    //update latest message
    await updatedLatestMessage(conversation_id, newMessage);
    res.json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    // console.log("userid get Messages", user_id);
    const conversation_id = req.params.conversation_id;
    if (!conversation_id) {
      logger.error("Please add the conversation id in the params");
      throw createHttpError.BadRequest("Something went wrong");
    }

    const messages = await getConversationMessages(conversation_id, user_id);
    res.send(messages);
  } catch (error) {
    next(error);
  }
};

exports.updateMessageStatus = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const { status } = req.body;
    console.log("status ::: ", status, user_id);
    await MessageModel.updateMany(
      {
        messageStatus: { $ne: status },
        sender: { $ne: user_id }, // Exclude documents where sender is user_id
      },
      {
        $set: { messageStatus: status },
      }
    );
    res.send("done");
  } catch (error) {
    next(error);
  }
};

exports.getUnReadConversationMessages = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const conversation_id = req.params.conversation_id;
    const unReadMessages = await MessageModel.find({
      conversation: conversation_id,
      messageStatus: { $ne: "read" },
      sender: { $ne: user_id },
    });
    res.send(unReadMessages);
  } catch (error) {
    next(error);
  }
};
