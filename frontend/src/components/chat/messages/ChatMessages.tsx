import { useAppSelector } from "@/redux/hooks";
import { messageType } from "@/types/messageType";
import Message from "./Message";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import Typing from "./Typing";

type Props = {
  typing: string;
  // typing: boolean;
};

export default function ChatMessages({ typing }: Props) {
  const { messages, activeConversation } = useAppSelector(
    (state) => state.chat
  );
  const { user } = useAppSelector((state) => state.user);
  const isPhone = useMediaQuery({
    query: "(max-width: 800px)",
  });

  // Create a new array with an additional property indicating if the sender is the same as the previous message
  const messagesWithSenderCheck = messages.reduce(
    (acc: any, message: messageType, index: number) => {
      const isSameSenderAsPrevious =
        index > 0 && message.sender._id === messages[index - 1].sender._id;
      acc.push({ ...message, isSameSenderAsPrevious });
      return acc;
    },
    []
  );

  // scroll to bottom when open a conversation or send a message
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      {/* Container */}
      <div
        className={`scrollbar overflow_scrollbar overflow-auto py-2 ${
          isPhone ? "px-[4%]" : "px-[6%]"
        }`}
      >
        {/* Chat Messages */}
        {messagesWithSenderCheck &&
          messagesWithSenderCheck.length > 0 &&
          messagesWithSenderCheck.map((message: messageType) => (
            <Message
              key={message._id}
              message={message}
              senderIsMe={user._id === message.sender._id}
              isSameSenderAsPrevious={message.isSameSenderAsPrevious!}
            />
          ))}
        {/* checking if typing contains a conversationId or it's "" which is false*/}
        {typing === activeConversation._id ? <Typing /> : null}
        <div ref={endRef}></div>
      </div>
    </div>
  );
}
