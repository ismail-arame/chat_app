import { CloseIcon } from "@/app/svg";
import { clearFiles } from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type Props = {
  activeIndex: number;
};

export default function Header({ activeIndex }: Props) {
  const { files } = useAppSelector((state) => state.chat);
  console.log("files :: ", files);
  const dispatch = useAppDispatch();
  const clearFilesHandler = () => {
    dispatch(clearFiles());
  };
  return (
    <div className="mt-[10px] w-full">
      {/* Container */}
      <div className="flex w-full items-center justify-between">
        {/* Close icon | empty files */}
        <div
          className="translate-x-4 cursor-pointer"
          onClick={() => clearFilesHandler()}
        >
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>
        {/* File name */}
        <h1 className="mb-1 translate-x-[-12px] text-[15px] dark:text-dark_text_1">
          {files[activeIndex]?.file?.name}
        </h1>
        {/* Empty tag */}
        <span></span>
      </div>
    </div>
  );
}
