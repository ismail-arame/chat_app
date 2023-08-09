import { ChatHeader, ChatMessages } from "@/components/chat";
import { getConversationMessages } from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { ChatActions } from "./actions";

type Props = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isPhone: boolean;
  isSmallPhone: boolean;
};

export default function ChatContainer({
  isDesktopOrLaptop,
  isTablet,
  isPhone,
  isSmallPhone,
}: Props) {
  const dispatch = useAppDispatch();
  const { activeConversation, messages } = useAppSelector(
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
  console.log("messages ::: ", messages);
  return (
    <div
      className={`relative h-full select-none overflow-hidden ${
        isPhone ? "" : "border-l dark:border-l-dark_border_2"
      } ${isPhone ? "w-[100%]" : isDesktopOrLaptop ? "w-[70%]" : "w-[60%]"}`}
    >
      {/* Container */}
      <div>
        {/* *_*_*_*_*_*_*_*_ Chat Header _*_*_*_*_*_*_*_* */}
        <ChatHeader isPhone={isPhone} isSmallPhone={isSmallPhone} />
        {/* *_*_*_*_*_*_*_*_ Chat Messages _*_*_*_*_*_*_*_* */}
        <ChatMessages />
        {/* *_*_*_*_*_*_*_*_ Chat Actions (Input) _*_*_*_*_*_*_*_* */}
        <ChatActions />
      </div>
    </div>
  );
}
