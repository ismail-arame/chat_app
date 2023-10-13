import { CloseIcon } from "@/app/svg";
import { addFiles } from "@/redux/features/chatSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getFileType } from "@/utils/file";
import { useRef } from "react";

type Props = {
  activeIndex: number;
  setActiveIndex: any;
};

export default function AddAnotherFile({ activeIndex, setActiveIndex }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const filesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/webp" &&
        file.type !== "image/gif" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg"
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
          // setActiveIndex(activeIndex + 1);
          console.log(file.type);
          const fileData = e.target?.result as string;
          dispatch(
            addFiles({
              file: file,
              fileData: getFileType(file.type) === "IMAGE" ? fileData : "",
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };
  return (
    <>
      <div
        className="mt-2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-md border dark:border-white"
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
      >
        <span className="rotate-45">
          <CloseIcon className="dark:fill-dark_svg_1" />
        </span>
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/pdf,application/msword,application/msword,application/vnd.ms-powerpoint,application/vnd.rar,application/zip,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg,audio/mpeg,audio/wav"
        onChange={filesHandler}
      />
    </>
  );
}
