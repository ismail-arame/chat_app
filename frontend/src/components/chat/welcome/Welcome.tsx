import Logo from "../../../app/svg/Logo";

type Props = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isPhone: boolean;
};

export default function Welcome({
  isDesktopOrLaptop,
  isTablet,
  isPhone,
}: Props) {
  return (
    <div
      className={`h-full select-none border-b-[6px] border-l border-b-green_2 dark:border-l-dark_border_2 dark:bg-dark_bg_4 ${
        isPhone ? "w-[0%]" : isDesktopOrLaptop ? "w-[70%]" : "w-[60%]"
      }`}
    >
      {/*Container*/}
      <div className="-mt-1.5 flex h-full w-full flex-col items-center justify-center gap-y-8">
        <span>
          <Logo width={isTablet ? 260 : 360} />
        </span>
        {/*Infos*/}
        <div className="mt-1 space-y-[12px] text-center">
          <h1
            className={`font-extralight dark:text-dark_text_4 ${
              isTablet ? "text-[28px]" : "text-[32px]"
            }`}
          >
            Whatsapp Web
          </h1>
          <p
            className={`dark:text-dark_text_3 ${
              isTablet ? "text-[13px]" : "text-sm"
            }`}
          >
            Send and receive messages, keep in touch with your family and
            friends
          </p>
        </div>
      </div>
    </div>
  );
}
