import { TriangleIcon } from "@/app/svg";
// import { messageType } from "@/types/messageType";
import { useMediaQuery } from "react-responsive";
import { BeatLoader, PulseLoader } from "react-spinners";

type Props = {
  //   message: messageType;
};

//senderIsMe => checking if the message sent is mine so i will display it in the right if it's not mine i'll show it in the left
export default function Typing({}: Props) {
  const isTablet = useMediaQuery({ minWidth: 800, maxWidth: 950 });
  const isPhone = useMediaQuery({
    query: "(max-width: 800px)",
  });
  const isSmallPhone = useMediaQuery({
    query: "(max-width: 500px)",
  });
  return (
    <div
      className={`mt-2 flex w-full space-x-3 ${
        isSmallPhone
          ? "max-w-[80%]"
          : isPhone
          ? "max-w-[300px]"
          : isTablet
          ? "max-w-[300px]"
          : "max-w-[420px]"
      }`}
    >
      {/* Message Container */}
      <div>
        <div
          className={
            "relative flex h-full items-center rounded-lg p-2 dark:bg-dark_bg_2 dark:text-dark_text_1"
          }
        >
          {/* Typing */}
          <p className="h-full justify-self-end pr-[10px] text-[13px]">
            <PulseLoader color="#fff" size={8} />
          </p>
          {/* Triangle */}
          <span>
            <TriangleIcon className="absolute -left-1.5 top-[-5px] rotate-[60deg] dark:fill-dark_bg_2" />
          </span>
        </div>
      </div>
    </div>
  );
}
