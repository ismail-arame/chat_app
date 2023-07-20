"use client";

import { useAppSelector } from "@/redux/hooks";
import HeaderUserIcons from "./HeaderUserIcons";

type Props = {};

export default function SidebarHeader({}: Props) {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center px16">
      {/* ***********__ Container __*********** */}
      <div className="w-full flex items-center justify-between">
        {/* ***********__ user image __*********** */}
        <button className="btn">
          <img
            src={user.picture}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
          {/* <img
            src="https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
            alt=""
            className="w-full h-full rounded-full object-cover"
          /> */}
        </button>
        {/* ***********__ user icons __*********** */}
        <HeaderUserIcons />
      </div>
    </div>
  );
}
