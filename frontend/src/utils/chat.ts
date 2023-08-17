//user => is the sender
//users => is the array of both the sender user and receiver user
//in the users array there is both sender and receiver

import { userType } from "@/types/userType";
import { onlineUsersType } from "@/types/onlineUsersType";

//to get the reciever id we have to check which is the one contains the sender id and then conclude the reciever id
export const getConversationReceiverId = (
  user: userType,
  users: userType[]
) => {
  return users[0]._id === user._id ? users[1]._id : users[0]._id;
};

export const checkOnlineStatus = (
  onlineUsers: onlineUsersType[],
  user: userType,
  users: userType[]
) => {
  let check = onlineUsers.find(
    (u) => u.userId === getConversationReceiverId(user, users)
  );
  return check ? true : false;
};
