import { logout } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Props = {
  showMenu: boolean;
  isTablet: boolean;
};

export default function Menu({ showMenu, isTablet }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    Cookies.remove("usertoken");
    await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`);
    router.push("/login");
  };

  return (
    <div
      className={`absolute right-1 z-50 rounded-[4px] shadow-md dark:bg-dark_bg_2 dark:text-dark_text_1 ${
        showMenu ? "open_menu" : ""
      } ${isTablet ? "w-48 text-sm" : "w-52 text-[15px]"}`}
    >
      <ul>
        <li className="hover: cursor-pointer py-3 pl-5 hover:bg-dark_bg_3">
          <span>New Group</span>
        </li>
        <li className="hover: cursor-pointer py-3 pl-5 hover:bg-dark_bg_3">
          <span>New Community</span>
        </li>
        <li className="hover: cursor-pointer py-3 pl-5 hover:bg-dark_bg_3">
          <span>Invite Friend</span>
        </li>
        <li className="hover: cursor-pointer py-3 pl-5 hover:bg-dark_bg_3">
          <span>Settings</span>
        </li>
        <li
          className="hover: cursor-pointer py-3 pl-5 hover:bg-dark_bg_3"
          onClick={handleLogout}
        >
          <span>Logout</span>
        </li>
      </ul>
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
