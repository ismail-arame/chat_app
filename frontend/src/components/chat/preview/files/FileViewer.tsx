import { useAppSelector } from "@/redux/hooks";

type Props = {
  activeIndex: number;
};

export default function FileViewer({ activeIndex }: Props) {
  const { files } = useAppSelector((state) => state.chat);
  return (
    <div className="w-full max-w-[60%]">
      {/* Container */}
      <div className="flex items-center justify-center">
        {files[activeIndex].type === "IMAGE" ? (
          <img
            src={files[activeIndex].fileData}
            alt="files[activeIndex].type"
            className="hview max-w-[80%] object-contain"
          />
        ) : (
          <div className="hview flex min-w-full flex-col items-center justify-center">
            {/* File Icon Image */}
            <img
              src={`../../../../../images/file/${files[activeIndex].type}.png`}
              alt={files[activeIndex].type}
            />
            {/* No preview text */}
            <h1 className="mt-8 text-2xl dark:text-dark_text_2">
              No preview available
            </h1>
            {/* File size / type */}
            <span className="text-sm dark:text-dark_text_2">
              {files[activeIndex]?.file?.size} Kb - {files[activeIndex]?.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
