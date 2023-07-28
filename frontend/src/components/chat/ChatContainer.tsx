import { ChatHeader, ChatMessages } from "@/components/chat";
import { getConversationMessages } from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

type Props = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isPhone: boolean;
};

export default function ChatContainer({
  isDesktopOrLaptop,
  isTablet,
  isPhone,
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
        <ChatHeader isPhone={isPhone} />
        {/* *_*_*_*_*_*_*_*_ Chat Messages _*_*_*_*_*_*_*_* */}
        <ChatMessages />
      </div>
    </div>
  );
}
