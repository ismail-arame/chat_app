const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");
const {
  createMessage,
  populateMessage,
  getConversationMessages,
} = require("../services/message.service");
const { updatedLatestMessage } = require("../services/conversation.service");

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

    const messageData = {
      sender: user_id,
      message,
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
    const conversation_id = req.params.conversation_id;
    if (!conversation_id) {
      logger.error("Please add the conversation id in the params");
      throw createHttpError.BadRequest("Something went wrong");
    }

    const messages = await getConversationMessages(conversation_id);
    res.send(messages);
  } catch (error) {
    next(error);
  }
};
