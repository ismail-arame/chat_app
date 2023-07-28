import { CloseIcon, NotificationIcon } from "@/app/svg";
import ArrowIcon from "../../../app/svg/Arrow";

type Props = { isTablet: boolean };

export default function Notifications({ isTablet }: Props) {
  return (
    <div
      className={`flex items-center p-[13px] dark:bg-dark_bg_3 ${
        isTablet ? "h-[80px]" : "h-[90px]"
      }`}
    >
      {/* Container */}
      <div className="flex w-full items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-x-4">
          <div className="cursor-pointer">
            <NotificationIcon
              className="dark:fill-blue_1"
              isTablet={isTablet}
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`${
                isTablet ? "text-[15px] text-dark_text_1" : "textPrimary"
              }`}
            >
              Get notified of new messages
            </span>
            <span
              className={`mt-0.5 flex items-center gap-0.5 ${
                isTablet ? "text-[13px] text-dark_text_2" : "textSecondary"
              }`}
            >
              Turn on desktop notifications
              <ArrowIcon className="mt-1 dark:fill-dark_svg_2" />
            </span>
          </div>
        </div>
        {/* Right Side */}
        <div className="cursor-pointer">
          <CloseIcon className="dark:fill-dark_svg_2" isTablet={isTablet} />
        </div>
      </div>
    </div>
  );
}
