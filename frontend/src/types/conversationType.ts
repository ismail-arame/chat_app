import { latestMessageType } from "./messageType";
import { usersType } from "./userType";

export type conversationType = {
  _id: string;
  name: string;
  picture: string;
  isGroup: boolean;
  users: any;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  latestMessage: any;
};
