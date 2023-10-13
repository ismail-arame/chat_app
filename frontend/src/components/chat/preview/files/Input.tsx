type Props = {
  message: string;
  setMessage: any;
};

export default function Input({ message, setMessage }: Props) {
  return (
    <div className="w-full max-w-[70%] rounded-lg dark:bg-dark_hover_1">
      {/* Message Input */}
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-11 w-full border-none bg-transparent pl-4 focus:outline-none dark:text-dark_text_1"
      />
    </div>
  );
}
