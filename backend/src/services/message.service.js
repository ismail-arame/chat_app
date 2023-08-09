const createHttpError = require("http-errors");
const { MessageModel } = require("../models");

exports.createMessage = async (messageData) => {
  let newMessage = await MessageModel.create(messageData);
  if (!newMessage) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return newMessage;
};

exports.populateMessage = async (id) => {
  const populatedMessage = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name picture isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });

  if (!populatedMessage) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return populatedMessage;
};

exports.getConversationMessages = async (conversation_id) => {
  const messages = await MessageModel.find({
    conversation: conversation_id,
  })
    .populate({
      path: "sender",
      select: "name picture email status",
      model: "UserModel",
    })
    // .populate("sender", "name picture email status") the same as the above one (both are valid)
    .populate({ path: "conversation", model: "ConversationModel" });
  if (!messages) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return messages;
};
