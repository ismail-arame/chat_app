import { useAppSelector } from "@/redux/hooks";
import AddAnotherFile from "./AddAnotherFile";
import { SendIcon } from "@/app/svg";

type Props = {
  activeIndex: number;
  setActiveIndex: any;
  message: string;
};

export default function HandleAndSend({
  activeIndex,
  setActiveIndex,
  message,
}: Props) {
  const { files } = useAppSelector((state) => state.chat);
  const sendMessageHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("files and message : ", files, message);
  };
  return (
    <div className="mt-2 flex w-[97%] items-center justify-between border-t dark:border-dark_border_2">
      {/* Empty */}
      <span></span>
      {/* List files */}
      <div className="items flex gap-x-2">
        {files.map((file: any, i: number) => (
          <div
            key={i}
            className={`mt-2 h-14 w-14 cursor-pointer overflow-hidden rounded-md border dark:border-white ${
              activeIndex === i && "border-[3px] !border-green_1"
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {file.type === "IMAGE" ? (
              <img
                src={file.fileData}
                alt={file.type}
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={`../../../../../images/file/${file.type}.png`}
                alt=""
                className="ml-2.5 mt-1.5 h-10 w-8"
              />
            )}
          </div>
        ))}
        {/* Add another file + */}
        <AddAnotherFile
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      {/* Send button */}
      <div
        className="mt-2 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-green_1"
        onClick={(e) => sendMessageHandler(e)}
      >
        <SendIcon className="fill-white" />
      </div>
    </div>
  );
}
