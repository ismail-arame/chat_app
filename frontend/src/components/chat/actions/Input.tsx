type Props = {
  message: string;
  setMessage: any;
  textRef: React.RefObject<HTMLInputElement>;
};

export default function Input({ message, setMessage, textRef }: Props) {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  console.log("message : ", message);
  return (
    <div className="w-full">
      <input
        type="text"
        className="h-[42px] w-full flex-1 rounded-lg pl-4 text-sm outline-none dark:bg-dark_hover_1 dark:text-dark_text_1"
        placeholder="Type a message"
        value={message}
        onChange={changeHandler}
        ref={textRef}
      />
    </div>
  );
}
