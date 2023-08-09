import { AttachmentIcon } from "@/app/svg";
import Menu from "./Menu";
import { useState } from "react";

type Props = {
  showAttachments: boolean;
  setShowAttachments: any;
  setShowEmojiPicker: any;
};

export default function Attachments({
  showAttachments,
  setShowAttachments,
  setShowEmojiPicker,
}: Props) {
  return (
    <li className="relative">
      <button
        type="button"
        className="btn"
        onClick={() => {
          setShowEmojiPicker(false);
          setShowAttachments((prev: boolean) => !prev);
        }}
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* Menu */}
      {showAttachments ? <Menu /> : null}
    </li>
  );
}
