const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");
const {
  doesConversationExist,
  createConversation,
  populateConversation,
  getUserConversations,
} = require("../services/conversation.service");
const { findUser } = require("../services/user.service");

exports.create_open_conversation = async (req, res, next) => {
  try {
    //authMiddleware passes the user's decoded_token to req.user
    const sender_id = req.user.userId;
    //the user that we will start the conversation with
    const { receiver_id } = req.body;

    //check if receiver id is provided
    if (!receiver_id) {
      logger.error("Please Provide the receive id to start a conversation");
      throw createHttpError.BadRequest(
        "you cannot start a conversation with nobody!"
      );
    }

    //check if chat already exists
    const existedConversation = await doesConversationExist(
      sender_id,
      receiver_id
    );

    if (existedConversation) {
      res.json(existedConversation);
    } else {
      //creating a new conversation
      const receiver_user = await findUser(receiver_id);

      let conversationData = {
        name: receiver_user.name,
        isGroup: false,
        users: [sender_id, receiver_id],
      };

      const newConversation = await createConversation(conversationData);

      //populate the users id with their UserModal infos using populate()
      const populatedConversation = await populateConversation(
        newConversation._id,
        "users",
        "-password"
      );
      res.status(200).json(populatedConversation);
    }
  } catch (error) {
    next(error);
  }
};

exports.getConversations = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
