"use client";

import { FilterIcon, ReturnIcon, SearchIcon } from "@/app/svg";
import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  searchLength: number;
  setSearchResults: any;
};

export default function Search({ searchLength, setSearchResults }: Props) {
  const { user } = useAppSelector((state) => state.user);
  const token = user.access_token;
  // const { token } = user;
  //showing the arrow or the search icon
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleClearInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ""; // Clear the input value to an empty string
    }
  };

  const sendSearchRequest = async (query: string) => {
    try {
      if (query) {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user?search=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(data);
        setLoading(false);
      } else {
        setSearchResults([]);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.response.data.error.message);
    }
  };

  const debouncedSearch = debounce(sendSearchRequest, 500);

  // useEffect to trigger the debounced search when searchQuery changes
  useEffect(() => {
    debouncedSearch(searchQuery);
    // This will prevent unnecessary API calls when the user is actively typing.
    // The debounced function will only be invoked once after the user stops typing for the specified delay.
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    console.log(target.value);
    setSearchQuery(target.value);
  };
  return (
    <div className="h-[49px] py-1.5">
      {/* Container */}
      <div className="px-[10px]">
        {/* Search Input Container */}
        <div className="flex items-center gap-x-2">
          <div className="flex w-full items-center rounded-lg pl-2 dark:bg-dark_bg_2">
            {show || searchLength > 0 ? (
              <span
                className="rotateAnimation flex w-8 cursor-pointer items-center justify-center"
                onClick={() => {
                  handleClearInput();
                  setSearchResults([]);
                  setShow(false);
                  setSearchQuery("");
                }}
              >
                <ReturnIcon className="w-5 fill-green_1" />
              </span>
            ) : (
              <span className="flex w-8 items-center justify-center">
                <SearchIcon className="w-5 dark:fill-dark_svg_2" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onChange={(e) => handleSearch(e)}
              ref={searchInputRef}
            />
            {loading && (
              <div
                className="ml-auto mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-green_1 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            )}
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
}
