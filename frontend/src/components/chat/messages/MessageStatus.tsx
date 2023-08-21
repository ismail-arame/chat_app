type Props = {
  messageStatus: string;
};

import { BsCheck, BsCheckAll } from "react-icons/bs";

export default function MessageStatus({ messageStatus }: Props) {
  return (
    <>
      {messageStatus === "sent" && <BsCheck className="text-lg" />}
      {messageStatus === "delivered" && <BsCheckAll className="text-lg" />}
      {messageStatus === "read" && (
        <BsCheckAll className="text-lg text-[#53bdeb]" />
      )}
    </>
  );
}
