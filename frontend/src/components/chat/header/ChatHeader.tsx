import { DotsIcon, SearchLargeIcon } from "@/app/svg";
import { useAppSelector } from "@/redux/hooks";
import { capitalize } from "../../../utils/string";

type Props = {
  isPhone: boolean;
};

export default function ChatHeader({ isPhone }: Props) {
  const { activeConversation } = useAppSelector((state) => state.chat);
  const { name, picture } = activeConversation;
  return (
    <div className="px16 flex h-[59px] select-none items-center dark:bg-dark_bg_2">
      {/* Container */}
      <div className="flex w-full items-center justify-between">
        {/* *_*_*_*_*_*_*_*_ Left Side _*_*_*_*_*_*_*_* */}
        <div className="flex items-center gap-x-4">
          {/* Conversation image */}
          <button className="btn">
            <img
              src={picture}
              alt={`${name} image`}
              className="h-full w-full rounded-full object-cover"
            />
          </button>
          {/* Conversation name and online status */}
          <div className="flex flex-col">
            <h1 className="text-md dark:text-white">{capitalize(name)}</h1>
            <span className="text-xs dark:text-dark_svg_2">online</span>
          </div>
        </div>
        {/* *_*_*_*_*_*_*_*_ Right Side _*_*_*_*_*_*_*_* */}
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
