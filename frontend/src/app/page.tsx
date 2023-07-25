"use client";

import { Sidebar } from "@/components/sidebar";
import { getConversations } from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  // console.log("user ===> ", user);

  //Get Conversations
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConversations(user.access_token));
    }
  }, [user]);
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden py-[19px] dark:bg-dark_bg_1">
      {/* Container */}
      <div className="container flex h-screen">
        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
