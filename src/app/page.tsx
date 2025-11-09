"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import { useUser } from "@/stores/user.store";
import { APP_ROUTES, TOAST_MESSAGES } from "../../config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CreateRoom from "@/components/CreateRoom";
import JoinRoom from "@/components/JoinRoom";
import { show_toast } from "@/utils/toast";

export default function Home() {
  const userData = useUser((state) => state.user);
  const router = useRouter();

  const handle_logout = () => {
    localStorage.clear();

    router.push(APP_ROUTES.LOGIN);
    show_toast(TOAST_MESSAGES.LOGOUT_SUCCESS, "success");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-white shadow-sm flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Hi, {userData.name} 👋
          </h1>
        </div>{" "}
        {/* Empty left side for balance */}
        <button
          onClick={handle_logout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md hover:cursor-pointer"
        >
          <LogoutIcon />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300">
        {/* Create Room Section */}
        <CreateRoom />

        {/* Join Room Section */}
        <JoinRoom />
      </main>
    </div>
  );
}
