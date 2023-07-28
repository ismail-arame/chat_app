import { conversationType } from "./conversationType";

export type senderType = {
  _id: string;
  name: string;
  email: string;
  picture: string;
  status: string;
};

export type latestMessageType = {
  _id: string;
  sender: senderType;
  message: string;
  conversation: string;
  files: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type messageType = {
  _id: string;
  sender: senderType;
  message: string;
  conversation: conversationType;
  files: any;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isSameSenderAsPrevious?: boolean | undefined;
};
