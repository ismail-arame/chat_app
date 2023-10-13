import { ChatHeader, ChatMessages } from "@/components/chat";
import { getConversationMessages } from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { ChatActions } from "./actions";
import { onlineUsersType } from "@/types/onlineUsersType";
import { checkOnlineStatus, getConversationReceiverId } from "@/utils/chat";
import FilesPreview from "./preview/files/FilesPreview";

type Props = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isPhone: boolean;
  isSmallPhone: boolean;
  onlineUsers: onlineUsersType[];
  typing: string;
  // typing: boolean;
};

export default function ChatContainer({
  isDesktopOrLaptop,
  isTablet,
  isPhone,
  isSmallPhone,
  onlineUsers,
  typing,
}: Props) {
  const dispatch = useAppDispatch();
  const { activeConversation, messages, files } = useAppSelector(
    (state) => state.chat
  );
  const { user } = useAppSelector((state) => state.user);
  const token = user.access_token;
  const values = {
    token,
    conversation_id: activeConversation?._id,
  };
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);
  // console.log("messages ::: ", messages);
  return (
    <div
      className={`relative h-full select-none overflow-hidden ${
        isPhone ? "" : "border-l dark:border-l-dark_border_2"
      } ${isPhone ? "w-[100%]" : isDesktopOrLaptop ? "w-[70%]" : "w-[60%]"}`}
    >
      {/* Container */}
      <div>
        {/* *_*_*_*_*_*_*_*_ Chat Header _*_*_*_*_*_*_*_* */}
        <ChatHeader
          isPhone={isPhone}
          isSmallPhone={isSmallPhone}
          online={checkOnlineStatus(
            onlineUsers,
            user,
            activeConversation.users
          )}
        />
        {files.length > 0 ? (
          <FilesPreview />
        ) : (
          <>
            {/* *_*_*_*_*_*_*_*_ Chat Messages _*_*_*_*_*_*_*_* */}
            <ChatMessages typing={typing} />
            {/* *_*_*_*_*_*_*_*_ Chat Actions (Input) _*_*_*_*_*_*_*_* */}
            <ChatActions />
          </>
        )}
      </div>
    </div>
  );
}
