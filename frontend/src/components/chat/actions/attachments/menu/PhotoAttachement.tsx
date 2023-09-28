import { PhotoIcon } from "@/app/svg";
import { addFiles } from "@/redux/features/chatSlice";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFileType } from "@/utils/file";

type Props = {};

export default function PhotoAttachement({}: Props) {
  const { files } = useAppSelector((state: any) => state.chat);
  console.log("files", files);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files: File[] = Array.from(e.target.files!);
    files.forEach((file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/webp" &&
        file.type !== "image/gif" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "video/webm"
      ) {
        files = files.filter((item) => {
          item.name !== file.name;
        });
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        // 1024 * 1024 => 1 mb
        files = files.filter((item) => {
          item.name !== file.name;
        });
        return;
      } else {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const fileData = e.target?.result as string;
          dispatch(
            addFiles({ file: file, fileData, type: getFileType(file.type) })
          );
        };
      }
    });
  };
  return (
    <li>
      <button
        type="button"
        className="rounded-full bg-[#BF50CF]"
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
      >
        <PhotoIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/mpeg,video/webm"
        onChange={handleImage}
      />
    </li>
  );
}
