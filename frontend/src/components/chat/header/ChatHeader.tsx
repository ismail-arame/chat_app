import { DotsIcon, ReturnIcon, SearchLargeIcon } from "@/app/svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { capitalize } from "../../../utils/string";
import { userType } from "@/types/userType";
import { setActiveConversation, setMessages } from "@/redux/features/chatSlice";

type Props = {
  isPhone: boolean;
  isSmallPhone: boolean;
};

export default function ChatHeader({ isPhone, isSmallPhone }: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { activeConversation } = useAppSelector((state) => state.chat);
  // const { picture } = activeConversation;

  //getting reciever infos
  const receiver = activeConversation.users.find(
    (conversationUser: userType) => conversationUser.name !== user.name
  );
  return (
    <div
      className={`flex h-[59px] select-none items-center dark:bg-dark_bg_2 ${
        isPhone ? "px-2" : "px16"
      }`}
    >
      {/* Container */}
      <div className="flex w-full items-center justify-between">
        {/* *_*_*_*_*_*_*_*_ Left Side _*_*_*_*_*_*_*_* */}
        <div
          className={`flex items-center ${
            isSmallPhone ? "gap-x-[2px]" : "gap-x-1"
          }`}
        >
          {/* Return Icon */}
          {isPhone && (
            <div
              className="cursor-pointer"
              onClick={() => {
                dispatch(
                  setActiveConversation({
                    _id: "",
                    name: "",
                    picture: "",
                    isGroup: false,
                    users: [],
                    latestMessage: {},
                  })
                );
                dispatch(setMessages([]));
              }}
            >
              <ReturnIcon className="fill-white" />
            </div>
          )}
          <div
            className={`flex items-center ${
              isSmallPhone ? "gap-x-2" : "gap-x-4"
            }`}
          >
            {/* Conversation image */}
            <button className={`${isSmallPhone ? "btn_small_phone" : "btn"}`}>
              <img
                src={receiver.picture}
                alt={`${receiver.name} image`}
                className="h-full w-full rounded-full object-cover"
              />
            </button>
            {/* Conversation name and online status */}
            <div className="flex flex-col">
              <h1 className="text-md dark:text-white">
                {capitalize(receiver.name)}
              </h1>
              <span className="text-xs dark:text-dark_svg_2">online</span>
            </div>
          </div>
        </div>
        {/* *_*_*_*_*_*_*_*_ Right Side _*_*_*_*_*_*_*_* */}
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className={isSmallPhone ? "btn_small_phone" : "btn"}>
              <SearchLargeIcon
                className="dark:fill-dark_svg_1"
                height={isSmallPhone ? "22" : "24"}
                width={isSmallPhone ? "22" : "24"}
              />
            </button>
          </li>
          <li>
            <button className={isSmallPhone ? "btn_small_phone" : "btn"}>
              <DotsIcon
                className="dark:fill-dark_svg_1"
                height={isSmallPhone ? 22 : 24}
                width={isSmallPhone ? 22 : 24}
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
