import { useState } from "react";
import FileViewer from "./FileViewer";
import HandleAndSend from "./HandleAndSend";
import Header from "./Header";
import Input from "./Input";

type Props = {};

export default function FilesPreview({}: Props) {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative flex w-full items-center justify-center py-2 ">
      {/* Container */}
      <div className="flex w-full flex-col items-center">
        {/* Header */}
        <Header activeIndex={activeIndex} />
        {/* Viewing Selected File */}
        <FileViewer activeIndex={activeIndex} />
        <div className="flex w-full flex-col items-center">
          {/* Message Input */}
          <Input message={message} setMessage={setMessage} />
          {/* Send and manipulate files */}
          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            message={message}
          />
        </div>
      </div>
    </div>
  );
}
