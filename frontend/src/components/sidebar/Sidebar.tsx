"use client";

import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";
import { useMediaQuery } from "react-responsive";

type Props = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isPhone: boolean;
};

export default function Sidebar({
  isDesktopOrLaptop,
  isTablet,
  isPhone,
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
      <SidebarHeader isTablet={isTablet} />
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
          <Conversations isTablet={isTablet} />
        </>
      )}
    </div>
  );
}
