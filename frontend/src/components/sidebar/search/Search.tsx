"use client";

import { FilterIcon, ReturnIcon, SearchIcon } from "@/app/svg";
import { useState } from "react";

type Props = {
  searchLength: number;
};

export default function Search({ searchLength }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  return (
    <div className="h-[49px] py-1.5">
      {/* Container */}
      <div className="px-[10px]">
        {/* Search Input Container */}
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span className="w-8 flex items-center justify-center rotateAnimation">
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={(e) => handleSearch(e)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
}
