"use client";

import { ChatContainer } from "@/components/chat";
import { Welcome } from "@/components/chat";
import { Sidebar } from "@/components/sidebar";
import {
  getConversations,
  updateMessagesAndConversations,
} from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSocketContext } from "@/context/SocketContext";
import { onlineUsersType } from "@/types/onlineUsersType";

export default function Home() {
  const socket = useSocketContext();
  // console.log("socket : , ", socket);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const userId: string = user._id;
  const { activeConversation } = useAppSelector((state) => state.chat);
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
      // console.log("client recieved message : ", message);
      dispatch(updateMessagesAndConversations(message));
    });
    //Listening to Typing Events
    socket.on("typing", (conversationId) => {
      console.log("typing : ", conversationId);
      setTyping(conversationId);
    });
    socket.on("stop typing", () => setTyping(""));
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
