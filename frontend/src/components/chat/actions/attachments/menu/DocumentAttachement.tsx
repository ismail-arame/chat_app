import { DocumentIcon } from "@/app/svg";
import { addFiles } from "@/redux/features/chatSlice";
import { useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { getFileType } from "@/utils/file";

type Props = {};

export default function DocumentAttachement({}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files: File[] = Array.from(e.target.files!);
    files.forEach((file) => {
      if (
        file.type !== "application/pdf" &&
        file.type !== "text/plain" &&
        file.type !== "application/msword" &&
        file.type !== "audio/mpeg" &&
        file.type !== "audio/wav" &&
        file.type !== "application/vnd.ms-powerpoint" &&
        file.type !== "application/vnd.rar" &&
        file.type !== "application/zip" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        files = files.filter((item) => {
          item.name !== file.name;
        });
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        // 1024 * 1024 => 1 mb
        files = files.filter((item) => {
          item.name !== file.name;
        });
        return;
      } else {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          console.log(file.type);
          const fileData = e.target?.result as string;
          dispatch(addFiles({ file: file, type: getFileType(file.type) }));
        };
      }
    });
  };
  return (
    <li>
      <button
        type="button"
        className="rounded-full bg-[#5F66CD]"
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
      >
        <DocumentIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/plain"
        onChange={handleDocument}
      />
    </li>
  );
}
