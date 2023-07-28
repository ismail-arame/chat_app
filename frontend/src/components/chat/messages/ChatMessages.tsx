import { useAppSelector } from "@/redux/hooks";
import { messageType } from "@/types/messageType";
import Message from "./Message";
import { useMediaQuery } from "react-responsive";

type Props = {};

export default function ChatMessages({}: Props) {
  const { messages } = useAppSelector((state) => state.chat);
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
              message={message}
              key={message._id}
              senderIsMe={user._id === message.sender._id}
              isSameSenderAsPrevious={message.isSameSenderAsPrevious!}
            />
          ))}
      </div>
    </div>
  );
}
