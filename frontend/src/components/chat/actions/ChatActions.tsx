import { SendIcon } from "@/app/svg";
import { Attachments } from "./attachments";
import EmojiPickerComp from "./EmojiPickerComp";
import Input from "./Input";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendMessage } from "@/redux/features/chatSlice";
import { useSocketContext } from "@/context/SocketContext";

type Props = {};

export default function ChatActions({}: Props) {
  const socket = useSocketContext();
  const [showAttachments, setShowAttachments] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { activeConversation, status } = useAppSelector((state) => state.chat);
  const token = user.access_token;
  const [message, setMessage] = useState<string>("");
  const textRef = useRef<HTMLInputElement>(null);
  const values = {
    token,
    message,
    conversation_id: activeConversation._id,
    files: "",
  };
  const sendMessageOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let newMsg = await dispatch(sendMessage(values));
    //sending the whole msg (includes conversation infos, message text and also sender's info and files)
    socket.emit("send message", newMsg.payload);
    setMessage("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={sendMessageOnSubmit}
      className="absolute bottom-0 flex h-[62px] w-full select-none items-center px-4 py-2 dark:bg-dark_bg_2"
    >
      {/* Container */}
      <div className="flex w-full items-center gap-x-2">
        {/* Emojis and attachements */}
        <ul className="flex gap-x-2">
          <EmojiPickerComp
            message={message}
            setMessage={setMessage}
            textRef={textRef}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
            setShowEmojiPicker={setShowEmojiPicker}
          />
        </ul>
        {/* Input */}
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        {/* Send Button */}
        <button
          type="submit"
          className="rounded-fulls flex h-[40px] w-[40px] items-center justify-center"
        >
          {status === "loading" && loading ? (
            <div
              className="ml-auto mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-green_1 motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}
