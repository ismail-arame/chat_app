import { open_create_conversation } from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getConversationReceiverId } from "@/utils/chat";
import { dateHandler } from "@/utils/date";
import { capitalize } from "@/utils/string";
import moment from "moment";

type Props = {
  conversation: any;
  isTablet: boolean;
};

type valuesType = {
  receiver_id: string;
  token: string;
};

export default function Conversation({ conversation, isTablet }: Props) {
  const latestMessageLength: number =
    conversation?.latestMessage?.message?.length;

  const shouldTruncate: boolean = latestMessageLength > 24;

  //open conversation because it already exist (we create it if it was in the search)
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const token = user.access_token;
  const values: valuesType = {
    receiver_id: getConversationReceiverId(user, conversation.users),
    token,
  };
  // console.log("conversation : ", conversation);
  const openConversation = () => {
    dispatch(open_create_conversation(values));
  };
  return (
    <li
      onClick={() => openConversation()}
      className="h-[72px] w-full cursor-pointer list-none px-[10px] dark:bg-dark_bg_1 dark:text-dark_text_1 hover:dark:bg-dark_bg_2"
    >
      {/* Container */}
      <div className="relative flex w-full items-center justify-between py-[10px]">
        {/* Left */}
        <div className="flex items-center gap-x-3">
          {/* Conversation user picture */}
          <div
            className={`relative overflow-hidden rounded-full ${
              isTablet
                ? "h-[42px] min-w-[42px] max-w-[42px]"
                : "h-[50px] min-w-[50px] max-w-[50px]"
            }`}
          >
            <img
              src={conversation.picture}
              alt={conversation.name}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Conversation name and latestMessage*/}
          <div className="flex w-full flex-col">
            {/* conversation name */}
            <h1
              className={`flex items-center gap-x-2 ${
                isTablet ? "text-[15px]" : ""
              }`}
            >
              {capitalize(conversation.name)}
            </h1>

            {/* conversation latestMessage */}
            <div
              className={`flex items-center gap-x-1 dark:text-dark_text_2 ${
                isTablet ? "text-[13px]" : "text-sm"
              }`}
            >
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                {shouldTruncate ? (
                  <p>{`${conversation?.latestMessage?.message.slice(
                    0,
                    24
                  )}...`}</p>
                ) : !conversation.latestMessage ? (
                  `Say hi 👋 to ${conversation.name}`
                ) : (
                  <p>{conversation?.latestMessage?.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div
          className={`flex flex-col items-end gap-y-4 ${
            isTablet ? "text-[11px]" : "text-xs"
          }`}
        >
          <span className="dark:text-dark_text_2">
            {conversation.latestMessage
              ? dateHandler(conversation.latestMessage?.createdAt)
              : ""}
          </span>
        </div>
      </div>
      {/* Border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}
