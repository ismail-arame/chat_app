import { TriangleIcon } from "@/app/svg";
import { messageType } from "@/types/messageType";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import MessageStatus from "./MessageStatus";

type Props = {
  message: messageType;
  senderIsMe: boolean;
  isSameSenderAsPrevious: boolean;
};

//senderIsMe => checking if the message sent is mine so i will display it in the right if it's not mine i'll show it in the left
export default function Message({
  message,
  senderIsMe,
  isSameSenderAsPrevious,
}: Props) {
  const isTablet = useMediaQuery({ minWidth: 800, maxWidth: 950 });
  const isPhone = useMediaQuery({
    query: "(max-width: 800px)",
  });
  const isSmallPhone = useMediaQuery({
    query: "(max-width: 500px)",
  });
  return (
    <div
      className={`mt-2 flex w-full space-x-3 ${
        senderIsMe ? "ml-auto justify-end" : ""
      } ${
        isSmallPhone
          ? "max-w-[80%]"
          : isPhone
          ? "max-w-[300px]"
          : isTablet
          ? "max-w-[300px]"
          : "max-w-[420px]"
      }`}
    >
      {/* Message Container */}
      <div>
        <div
          className={`relative flex h-full items-center rounded-lg p-2 dark:text-dark_text_1 ${
            senderIsMe ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          {/* Message */}
          <p
            className={`h-full justify-self-end text-[13px] ${
              senderIsMe ? "pr-[52px]" : "pr-9"
            }`}
          >
            {message.message}
          </p>
          <div className="dark: absolute bottom-[2px] right-1.5 float-right flex items-center justify-center pt-6 text-[11px] text-dark_text_5">
            <span>{moment(message.createdAt).format("HH:mm")}</span>
            {senderIsMe && (
              <MessageStatus messageStatus={message.messageStatus} />
            )}
          </div>
          {/* Triangle */}
          {!senderIsMe && !isSameSenderAsPrevious ? (
            <span>
              <TriangleIcon className="absolute -left-1.5 top-[-5px] rotate-[60deg] dark:fill-dark_bg_2" />
            </span>
          ) : senderIsMe && !isSameSenderAsPrevious ? (
            <span>
              <TriangleIcon className="absolute -right-[8px] top-[-1px] rotate-[180deg] dark:fill-green_3" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
