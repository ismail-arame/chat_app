import { useAppSelector } from "@/redux/hooks";
import Conversation from "./Conversation";
import { conversationType } from "@/types/conversationType";

type Props = {
  isTablet: boolean;
};

export default function Conversations({ isTablet }: Props) {
  const { conversations } = useAppSelector((state) => state.chat);
  // console.log(conversations);
  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations.length > 0 &&
          conversations.map((conversation: conversationType) => (
            <Conversation
              conversation={conversation}
              isTablet={isTablet}
              key={conversation._id}
            />
          ))}
      </ul>
    </div>
  );
}
