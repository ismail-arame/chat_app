import { CloseIcon, EmojiIcon } from "@/app/svg";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useEffect, useState } from "react";

type Props = {
  message: string;
  setMessage: any;
  textRef: React.RefObject<HTMLInputElement>;
  showEmojiPicker: boolean;
  setShowEmojiPicker: any;
  setShowAttachments: any;
};

export default function EmojiPickerComp({
  message,
  setMessage,
  textRef,
  showEmojiPicker,
  setShowEmojiPicker,
  setShowAttachments,
}: Props) {
  const [cursorPositon, setCursorPosition] = useState();
  useEffect(() => {
    if (textRef.current) {
      textRef.current.selectionEnd = cursorPositon as any;
    }
  }, [cursorPositon]);

  const handleEmoji = (emojiData: any, e: any) => {
    // console.log(emojiData);
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref?.focus();
    const start = message.substring(0, ref?.selectionStart!);
    const end = message.substring(ref?.selectionStart!);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <li>
      <button
        onClick={() => {
          setShowAttachments(false);
          setShowEmojiPicker((prev: boolean) => !prev);
        }}
        className="btn"
        type="button"
      >
        {showEmojiPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {/* Emoji picker */}
      {showEmojiPicker ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker
            theme={Theme.DARK}
            height={322}
            onEmojiClick={handleEmoji}
          />
        </div>
      ) : null}
    </li>
  );
}
