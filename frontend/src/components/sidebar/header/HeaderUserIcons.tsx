"use client";

import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "@/app/svg";
import { useState } from "react";
import Menu from "./Menu";
import { onlineUsersType } from "@/types/onlineUsersType";

type Props = {
  isTablet: boolean;
  setOnlineUsers: any;
  onlineUsers: onlineUsersType[];
};

export default function HeaderUserIcons({
  isTablet,
  onlineUsers,
  setOnlineUsers,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <ul className="flex items-center gap-x-2.5">
      <li>
        <button className={`${isTablet ? "btn_tablet" : "btn"}`}>
          <CommunityIcon className="dark:fill-dark_svg_1" />
        </button>
      </li>
      <li>
        <button className={`${isTablet ? "btn_tablet" : "btn"}`}>
          <StoryIcon className="dark:fill-dark_svg_1" />
        </button>
      </li>
      <li>
        <button className={`${isTablet ? "btn_tablet" : "btn"}`}>
          <ChatIcon className="dark:fill-dark_svg_1" />
        </button>
      </li>
      <li className="relative" onClick={() => setShowMenu((prev) => !prev)}>
        <button
          className={`${isTablet ? "btn_tablet" : "btn"} ${
            showMenu ? "bg-dark_hover_1" : ""
          }`}
        >
          <DotsIcon className="dark:fill-dark_svg_1" />
        </button>
        {showMenu ? (
          <Menu
            showMenu={showMenu}
            isTablet={isTablet}
            onlineUsers={onlineUsers}
            setOnlineUsers={setOnlineUsers}
          />
        ) : null}
      </li>
    </ul>
  );
}
