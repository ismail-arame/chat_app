import { useAppSelector } from "@/redux/hooks";
import Conversation from "./Conversation";

type Props = {};

export default function Conversations({}: Props) {
  const { conversations } = useAppSelector((state) => state.chat);
  console.log(conversations);
  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations.length > 0 &&
          conversations.map((conversation: any) => (
            <Conversation conversation={conversation} key={conversation._id} />
          ))}
      </ul>
    </div>
  );
}
