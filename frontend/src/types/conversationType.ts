import { latestMessageType } from "./messageType";

export type conversationType = {
  _id: string;
  name: string;
  picture: string;
  isGroup: boolean;
  users: any;
  unreadMessages?: any;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  latestMessage: any;
};
