"use client";

import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";
import { useMediaQuery } from "react-responsive";
import { onlineUsersType } from "@/types/onlineUsersType";

type Props = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isPhone: boolean;
  onlineUsers: onlineUsersType[];
  setOnlineUsers: any;
  typing: string;
};

export default function Sidebar({
  isDesktopOrLaptop,
  isTablet,
  isPhone,
  onlineUsers,
  setOnlineUsers,
  typing,
}: Props) {
  const [searchResults, setSearchResults] = useState([]);
  // console.log(searchResults);

  return (
    <div
      className={`h-full select-none ${
        isPhone ? "w-[100%]" : isDesktopOrLaptop ? "w-[30%]" : "w-[40%]"
      }`}
    >
      {/* Sidebar Header */}
      <SidebarHeader
        isTablet={isTablet}
        onlineUsers={onlineUsers}
        setOnlineUsers={setOnlineUsers}
      />
      {/* Notifications */}
      {!isPhone && <Notifications isTablet={isTablet} />}
      {/* Search */}
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
        isTablet={isTablet}
      />
      {searchResults.length > 0 ? (
        <>
          {/* Search user results */}
          <SearchResults searchResults={searchResults} isTablet={isTablet} />
        </>
      ) : (
        <>
          {/* Conversations */}
          <Conversations
            isTablet={isTablet}
            onlineUsers={onlineUsers}
            typing={typing}
          />
        </>
      )}
    </div>
  );
}
