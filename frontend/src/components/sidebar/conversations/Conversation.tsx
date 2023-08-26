import MessageStatus from "@/components/chat/messages/MessageStatus";
import { useSocketContext } from "@/context/SocketContext";
import {
  getUnReadConversationMessages,
  open_create_conversation,
  updateConversationUnReadMessages,
} from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userType } from "@/types/userType";
import { getConversationReceiverId } from "@/utils/chat";
import { dateHandler } from "@/utils/date";
import { capitalize } from "@/utils/string";
import moment from "moment";
import { useEffect } from "react";

type Props = {
  conversation: any;
  isTablet: boolean;
  online: boolean;
  typing: string;
};

type valuesType = {
  receiver_id: string;
  token: string;
};

export default function Conversation({
  conversation,
  isTablet,
  online,
  typing,
}: Props) {
  const socket = useSocketContext();
  const latestMessageLength: number =
    conversation?.latestMessage?.message?.length;

  const shouldTruncate: boolean = latestMessageLength > 24;

  //open conversation because it already exist (we create it if it was in the search)
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { activeConversation } = useAppSelector((state) => state.chat);
  const token = user.access_token;
  const values: valuesType = {
    receiver_id: getConversationReceiverId(user, conversation.users),
    token,
  };
  const values2 = {
    token,
    conversation_id: conversation._id,
  };
  useEffect(() => {
    dispatch(getUnReadConversationMessages(values2));
    // console.log("conversation unread data:  ", data);
  }, []);
  // console.log("conversation : ", conversation);
  const openConversation = async () => {
    let newActiveConversation = await dispatch(
      open_create_conversation(values)
    );
    let conversationId = newActiveConversation.payload._id;
    let receiverId = receiver._id;
    let userId = user._id;
    socket.emit("join conversation", { conversationId, receiverId, userId });
    //empty unreadMessages array of the activeConversation
    dispatch(updateConversationUnReadMessages(conversation));
  };

  //getting reciever infos
  const receiver = conversation.users.find(
    (conversationUser: userType) => conversationUser.name !== user.name
  );
  return (
    <li
      onClick={() => openConversation()}
      className={`${
        isTablet ? "h-[61px]" : "h-[72px]"
      } w-full cursor-pointer list-none px-[10px] dark:bg-dark_bg_1 dark:text-dark_text_1 hover:${
        conversation._id === activeConversation._id ? "" : "dark:bg-dark_bg_2"
      } ${
        conversation._id === activeConversation._id
          ? "dark:bg-dark_hover_1"
          : ""
      }`}
    >
      {/* Container */}
      <div className="relative flex w-full items-center justify-between py-[10px]">
        {/* Left */}
        <div className="flex items-center gap-x-3">
          {/* Conversation user picture */}
          <div
            className={`relative overflow-hidden rounded-full ${
              online ? "online" : ""
            } ${
              isTablet
                ? "h-[42px] min-w-[42px] max-w-[42px]"
                : "h-[50px] min-w-[50px] max-w-[50px]"
            }`}
          >
            <img
              src={receiver.picture}
              alt={receiver.name}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Conversation name and latestMessage*/}
          <div className="flex w-full flex-col">
            {/* conversation name */}
            <h1
              className={`flex items-center gap-x-2 ${
                isTablet ? "text-[15px]" : ""
              }`}
            >
              {capitalize(receiver.name)}
            </h1>

            {/* conversation latestMessage */}
            <div
              className={`flex items-center gap-x-1 dark:text-dark_text_2 ${
                isTablet ? "text-[13px]" : "text-sm"
              }`}
            >
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                {typing === conversation._id ? (
                  <p className="text-green_1">Typing...</p>
                ) : shouldTruncate ? (
                  <p>{`${conversation?.latestMessage?.message.slice(
                    0,
                    24
                  )}...`}</p>
                ) : !conversation.latestMessage ? (
                  `Say hi 👋 to ${receiver.name}`
                ) : (
                  <div className="flex items-center">
                    {conversation?.latestMessage?.sender?._id === user._id && (
                      <span className="mr-[3px] self-end">
                        <MessageStatus
                          messageStatus={
                            conversation?.latestMessage?.messageStatus
                          }
                        />
                      </span>
                    )}
                    <p>{conversation?.latestMessage?.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div
          className={`mb-1 flex flex-col items-end gap-y-[10px] ${
            isTablet ? "text-[11px]" : "text-xs"
          }`}
        >
          <span className="dark:text-dark_text_2">
            {conversation.latestMessage
              ? dateHandler(conversation.latestMessage?.createdAt)
              : ""}
          </span>
          {conversation.unreadMessages &&
          conversation.unreadMessages.length > 0 ? (
            <div className="mb-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green_1 text-[10px] text-dark_bg_1">
              {conversation.unreadMessages.length}
            </div>
          ) : null}
        </div>
      </div>
      {/* Border */}
      {/* <div className="ml-16 border-b dark:border-b-dark_border_1"></div> */}
    </li>
  );
}
