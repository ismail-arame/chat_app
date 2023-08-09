"use client";

import { ChatContainer } from "@/components/chat";
import { Welcome } from "@/components/chat";
import { Sidebar } from "@/components/sidebar";
import { getConversations } from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { activeConversation } = useAppSelector((state) => state.chat);
  console.log("activeConversation : ", activeConversation);
  // console.log("user ===> ", user);

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
          />
        ) : isPhone && activeConversation._id ? (
          <ChatContainer
            isDesktopOrLaptop={isDesktopOrLaptop}
            isTablet={isTablet}
            isPhone={isPhone}
            isSmallPhone={isSmallPhone}
          />
        ) : (
          <>
            {/* Sidebar */}
            <Sidebar
              isDesktopOrLaptop={isDesktopOrLaptop}
              isTablet={isTablet}
              isPhone={isPhone}
            />
            {/* right side */}
            {activeConversation._id ? (
              <ChatContainer
                isDesktopOrLaptop={isDesktopOrLaptop}
                isTablet={isTablet}
                isPhone={isPhone}
                isSmallPhone={isSmallPhone}
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
