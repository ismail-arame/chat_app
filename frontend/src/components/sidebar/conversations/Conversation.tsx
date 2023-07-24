import { dateHandler } from "@/utils/date";
import moment from "moment";

type Props = {
  conversation: any;
};

export default function Conversation({ conversation }: Props) {
  const latestMessageLength: number =
    conversation?.latestMessage?.message?.length;

  const shouldTruncate: boolean = latestMessageLength > 50;

  return (
    <li className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]">
      {/* Container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* Left */}
        <div className="flex items-center gap-x-3">
          {/* Conversation user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={conversation.picture}
              alt={conversation.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Conversation name and latestMessage*/}
          <div className="w-full flex flex-col">
            {/* conversation name */}
            <h1 className="flex items-center gap-x-2">{conversation.name}</h1>

            {/* conversation latestMessage */}
            <div className="flex items-center gap-x-1 text-sm dark:text-dark_text_2">
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                {shouldTruncate ? (
                  <p>{`${conversation?.latestMessage?.message.slice(
                    0,
                    50
                  )}...`}</p>
                ) : (
                  <p>{conversation?.latestMessage?.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {dateHandler(conversation.latestMessage?.createdAt)}
          </span>
        </div>
      </div>
      {/* Border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}
