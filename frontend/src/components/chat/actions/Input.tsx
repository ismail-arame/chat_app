import { useSocketContext } from "@/context/SocketContext";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

type Props = {
  message: string;
  setMessage: any;
  textRef: React.RefObject<HTMLInputElement>;
};

export default function Input({ message, setMessage, textRef }: Props) {
  const { activeConversation } = useAppSelector((state) => state.chat);
  const socket = useSocketContext();
  const [typing, setTyping] = useState<boolean>(false);
  let typingTimeout: any;
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation._id);
    }
    let lastTypingTime = new Date().getTime();
    let timer = 3000;
    // Clear the existing timeout
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit("stop typing", activeConversation._id);
        setTyping(false);
      }
    }, timer);
    if (e.target.value === "") {
      socket.emit("stop typing", activeConversation._id);
      setTyping(false);
    }
  };
  console.log("message : ", message);
  return (
    <div className="w-full">
      <input
        type="text"
        className="h-[42px] w-full flex-1 rounded-lg pl-4 text-sm outline-none dark:bg-dark_hover_1 dark:text-dark_text_1"
        placeholder="Type a message"
        value={message}
        onChange={changeHandler}
        ref={textRef}
      />
    </div>
  );
}
