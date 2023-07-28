import {
  getCreatedUserConversation,
  open_create_conversation,
} from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userType } from "@/types/userType";

type Props = {
  contact: userType;
  isTablet: boolean;
};

type valuesType = {
  receiver_id: string;
  token: string;
};

export default function Contact({ contact, isTablet }: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const token = user.access_token;
  const values: valuesType = {
    receiver_id: contact._id,
    token,
  };
  const createConversation = async () => {
    await dispatch(open_create_conversation(values));
    dispatch(getCreatedUserConversation(values));
  };
  return (
    <li
      onClick={() => createConversation()}
      className="h-[72px] cursor-pointer list-none px-[10px] dark:text-dark_text_1 hover:dark:bg-dark_bg_2"
    >
      {/* Container */}
      <div className="flex items-center gap-x-3 py-[10px]">
        {/* Contact Infos */}
        <div className="flex items-center gap-x-3">
          {/* Conversation user picture */}
          <div
            className={`relative overflow-hidden rounded-full ${
              isTablet
                ? "h-[42px] min-w-[42px] max-w-[42px]"
                : "h-[50px] min-w-[50px] max-w-[50px]"
            }`}
          >
            <img
              src={contact.picture}
              alt={contact.name}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Conversation name and Status*/}
          <div className="flex w-full flex-col">
            {/* contact name */}
            <h1
              className={`flex items-center gap-x-2 ${
                isTablet ? "text-[15px]" : ""
              }`}
            >
              {contact.name}
            </h1>

            {/* contact Status */}
            <div
              className={`flex items-center gap-x-1 dark:text-dark_text_2 ${
                isTablet ? "text-[13px]" : "text-sm"
              }`}
            >
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                <p>{contact.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}
