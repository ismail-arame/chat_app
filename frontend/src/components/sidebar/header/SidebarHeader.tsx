"use client";

import { useAppSelector } from "@/redux/hooks";
import HeaderUserIcons from "./HeaderUserIcons";

type Props = {
  isTablet: boolean;
};

export default function SidebarHeader({ isTablet }: Props) {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="px16 flex h-[59px] items-center dark:bg-dark_bg_2">
      {/* ***********__ Container __*********** */}
      <div className="flex w-full items-center justify-between">
        {/* ***********__ user image __*********** */}
        <button className={`${isTablet ? "btn_tablet" : "btn"}`}>
          <img
            src={user.picture}
            alt={user.name}
            className="h-full w-full rounded-full object-cover"
          />
          {/* <img
            src="https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
            alt=""
            className="w-full h-full rounded-full object-cover"
          /> */}
        </button>
        {/* ***********__ user icons __*********** */}
        <HeaderUserIcons isTablet={isTablet} />
      </div>
    </div>
  );
}
