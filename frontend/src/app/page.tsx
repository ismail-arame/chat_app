"use client";

import { Sidebar } from "@/components/sidebar";
import { getConversations } from "@/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  console.log("user ===> ", user);

  //Get Conversations
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConversations(user.access_token));
    }
  }, [user]);
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="container min-h-screen flex">
        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}

// import { logout } from "@/redux/features/userSlice";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// const router = useRouter();
// const handleLogout = async () => {
//   dispatch(logout());
//   Cookies.remove("usertoken");
//   await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`);
//   router.push("/login");
// };
