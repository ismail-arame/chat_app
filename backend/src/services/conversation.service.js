const createHttpError = require("http-errors");
const {
  ConversationModel,
  UserModel,
  MessageModel,
} = require("../models/index");

exports.getConversationById = async (conversationId) => {
  let conversation = await ConversationModel.findById(conversationId);
  return conversation;
};

//to get the reciever id we have to check which is the one contains the sender id and then conclude the reciever id
//user => senderId and users => conversation.users array
exports.getConversationReceiverId = (user, users) => {
  //convert this array of new ObjectId to an array of strings
  /* conversation.users = [
    new ObjectId("64ad1ac0474df13119b5690c"),
    new ObjectId("64b70cd9810fc6bab18f930e")
  ]
  */

  const conversationUsersStringIdArray = users.map((objectId) =>
    objectId.toString()
  );

  /* [ conversationUsersStringIdArray = '64ad1ac0474df13119b5690c', '64b70cd9810fc6bab18f930e' ]*/

  return conversationUsersStringIdArray[0] === user
    ? conversationUsersStringIdArray[1]
    : conversationUsersStringIdArray[0];
};

exports.doesConversationExist = async (sender_id, receiver_id) => {
  //using $and to query based on 2 conditions :
  // 1)  isGroup is false (one-on-one conversations).
  // 2)  Both sender_id and receiver_id are present in the users array.
  let conversation = await ConversationModel.find({
    isGroup: false,
    //searching for multiple things in the users array
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  //The purpose of using populate is to enhance the result of the query by expanding the referenced ObjectId fields (users and latestMessage) into actual user and message documents, making it easier to work with the full data of the conversation.

  // the conversation variable will contain an array of matched conversation documents, and each document will have the users field populated with user data (excluding passwords) and the latestMessage field populated with the latest message data.

  if (!conversation) {
    throw createHttpError.BadRequest("Something Went wrong");
  }

  conversation = await UserModel.populate(conversation, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  return conversation[0];
};

exports.createConversation = async (conversationData) => {
  const newConversation = await ConversationModel.create(conversationData);
  if (!newConversation) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return newConversation;
};

exports.populateConversation = async (id, fieldToPopulate, fieldToRemove) => {
  const populatedConversation = await ConversationModel.findOne({
    _id: id,
  }).populate(fieldToPopulate, fieldToRemove);

  if (!populatedConversation) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return populatedConversation;
};

exports.getUserConversations = async (user_id) => {
  //update message's status from sent to delivered when the user is online (only in non Group convos)
  await MessageModel.updateMany(
    {
      messageStatus: "sent",
      sender: { $ne: user_id }, // Exclude documents where sender is user_id
    },
    {
      $set: { messageStatus: "delivered" },
    }
  );
  let conversations;
  //we will search in every conversation model document and if the user_id exist in the users array that means that this user belong to this conversation (private or group)
  await ConversationModel.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    //   When using populate("users"), Mongoose will replace these ObjectId references with the actual user documents from the "Users" collection.
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 }) //newest first
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversations = results;
    })
    .catch((error) => {
      throw createHttpError.BadRequest("Something went wrong");
    });

  return conversations;
};

exports.getUserConversation = async (sender_id, receiver_id) => {
  let conversation;
  console.log(sender_id, receiver_id);
  await ConversationModel.findOne({
    isGroup: false,
    //searching for multiple things in the users array
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .then(async (result) => {
      result = await UserModel.populate(result, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversation = result;
    })
    .catch((error) => {
      throw createHttpError.BadRequest("Something went wrong");
    });

  // console.log("convo : ", conversation);
  return conversation;
};

exports.updatedLatestMessage = async (conversation_id, newMessage) => {
  const updatedConversation = await ConversationModel.findByIdAndUpdate(
    conversation_id,
    {
      latestMessage: newMessage,
    }
  );
  if (!updatedConversation) {
    throw createHttpError.BadRequest("Something went wrong");
  }
  return updatedConversation;
};
