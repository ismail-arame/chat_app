type Props = {
  contact: any;
};

export default function Contact({ contact }: Props) {
  return (
    <li className="h-[72px] cursor-pointer list-none px-[10px] dark:text-dark_text_1 hover:dark:bg-dark_bg_2">
      {/* Container */}
      <div className="flex items-center gap-x-3 py-[10px]">
        {/* Contact Infos */}
        <div className="flex items-center gap-x-3">
          {/* Conversation user picture */}
          <div className="relative h-[50px] min-w-[50px] max-w-[50px] overflow-hidden rounded-full">
            <img
              src={contact.picture}
              alt={contact.name}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Conversation name and Status*/}
          <div className="flex w-full flex-col">
            {/* contact name */}
            <h1 className="flex items-center gap-x-2">{contact.name}</h1>

            {/* contact Status */}
            <div className="flex items-center gap-x-1 text-sm dark:text-dark_text_2">
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
