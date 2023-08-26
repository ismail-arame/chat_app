import { useAppSelector } from "@/redux/hooks";
import Conversation from "./Conversation";
import { conversationType } from "@/types/conversationType";
import { onlineUsersType } from "@/types/onlineUsersType";
import { checkOnlineStatus, getConversationReceiverId } from "@/utils/chat";

type Props = {
  isTablet: boolean;
  onlineUsers: onlineUsersType[];
  typing: string;
};

export default function Conversations({
  isTablet,
  onlineUsers,
  typing,
}: Props) {
  const { conversations } = useAppSelector((state) => state.chat);
  console.log("conversations first : ", conversations);
  const { user } = useAppSelector((state) => state.user);
  // console.log(conversations);
  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations.length > 0 &&
          conversations.map((conversation: conversationType) => {
            let check = checkOnlineStatus(
              onlineUsers,
              user,
              conversation.users
            );
            return (
              <Conversation
                conversation={conversation}
                isTablet={isTablet}
                key={conversation._id}
                online={check}
                typing={typing}
              />
            );
          })}
      </ul>
    </div>
  );
}
