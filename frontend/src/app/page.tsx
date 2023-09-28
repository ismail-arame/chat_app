"use client";

import { ChatContainer } from "@/components/chat";
import { Welcome } from "@/components/chat";
import { Sidebar } from "@/components/sidebar";
import {
  getConversations,
  updateLatestMessageStatusToRead,
  updateMessageStatus,
  updateMessageStatusToRead,
  updateMessagesAndConversations,
} from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSocketContext } from "@/context/SocketContext";
import { onlineUsersType } from "@/types/onlineUsersType";

export default function Home() {
  const socket = useSocketContext();
  // console.log("socket : , ", socket);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { files } = useAppSelector((state) => state.chat);
  console.log("files : ", files);

  const userId: string = user._id;
  const { activeConversation } = useAppSelector((state) => state.chat);
  const activeConversationRef: any = useRef(null);
  activeConversationRef.current = activeConversation;
  const [onlineUsers, setOnlineUsers] = useState<onlineUsersType[]>([]);
  //typing (contains a conversationId or "") if it contains a convoId that allow us to show typing... in the sidebar for that conversation
  const [typing, setTyping] = useState<string>("");

  //join user into socket io
  useEffect(() => {
    socket.emit("join", userId);
    //get online users
    socket.on("get-online-users", (users: onlineUsersType[]) => {
      setOnlineUsers([...users]);
    });
  }, [user]);

  useEffect(() => {
    //Listening for recieved messages
    socket.on("receive message", (message) => {
      console.log("recieved message: ", message);
      //update unreadMessages array inside conversation realtime
      dispatch(updateMessagesAndConversations(message));

      const senderId = message.sender._id;
      const receiverId =
        message.conversation.users[0]._id === senderId
          ? message.conversation.users[1]._id
          : message.conversation.users[0]._id;

      if (
        activeConversationRef.current?._id === message.conversation._id &&
        !message.conversation.isGroup
      ) {
        // when the reciever is catively chating with the sender we have to emit a socket event to the sender that the reciever has viewed the message and then update the state of the message (messageStatus = "read") in the sender's UI
        const conversationId = message.conversation._id;
        socket.emit("seen message", { senderId, receiverId, conversationId });
        // console.log("status :::: i am fine bro");
        const values = {
          token: user?.access_token,
          status: "read",
        };
        // change messageStatus to be read when the receiver is actively chating with a user
        dispatch(updateMessageStatus(values));
      }
    });
  }, [user]);

  //Listening to Typing Events
  useEffect(() => {
    socket.on("typing", (conversationId) => {
      console.log("typing : ", conversationId);
      setTyping(conversationId);
    });
    socket.on("stop typing", () => setTyping(""));
  }, [user]);

  //message seen notification
  useEffect(() => {
    socket.on("message seen notification", ({ receiverId, conversationId }) => {
      // Display a notification or update the UI to indicate the message has been seen.
      dispatch(updateMessageStatusToRead());
      dispatch(updateLatestMessageStatusToRead(conversationId));
    });
  }, [user]);

  //Get Conversations
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConversations(user.access_token));
    }
  }, [user]);

  //Reponsiveness
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTablet = useMediaQuery({ minWidth: 800, maxWidth: 950 });
  const isPhone = useMediaQuery({
    query: "(max-width: 800px)",
  });
  const isSmallPhone = useMediaQuery({
    query: "(max-width: 500px)",
  });
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden dark:bg-dark_bg_1">
      {/* Container */}
      <div className="app_container flex h-screen">
        {isPhone && !activeConversation._id ? (
          <Sidebar
            isDesktopOrLaptop={isDesktopOrLaptop}
            isTablet={isTablet}
            isPhone={isPhone}
            onlineUsers={onlineUsers}
            setOnlineUsers={setOnlineUsers}
            typing={typing}
          />
        ) : isPhone && activeConversation._id ? (
          <ChatContainer
            isDesktopOrLaptop={isDesktopOrLaptop}
            isTablet={isTablet}
            isPhone={isPhone}
            isSmallPhone={isSmallPhone}
            onlineUsers={onlineUsers}
            typing={typing}
          />
        ) : (
          <>
            {/* Sidebar */}
            <Sidebar
              isDesktopOrLaptop={isDesktopOrLaptop}
              isTablet={isTablet}
              isPhone={isPhone}
              onlineUsers={onlineUsers}
              setOnlineUsers={setOnlineUsers}
              typing={typing}
            />
            {/* right side */}
            {activeConversation._id ? (
              <ChatContainer
                isDesktopOrLaptop={isDesktopOrLaptop}
                isTablet={isTablet}
                isPhone={isPhone}
                isSmallPhone={isSmallPhone}
                onlineUsers={onlineUsers}
                typing={typing}
              />
            ) : (
              <Welcome
                isDesktopOrLaptop={isDesktopOrLaptop}
                isTablet={isTablet}
                isPhone={isPhone}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// const HomeWithSocket = (props) => {}
