"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import { useUser } from "@/stores/user.store";
import { APP_ROUTES, LOCAL_STORAGE_KEYS, TOAST_MESSAGES } from "../../config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const userData = useUser((state) => state.user);
  const router = useRouter();

  const handle_logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);

    router.push(APP_ROUTES.LOGIN);
    toast.success(TOAST_MESSAGES.LOGOUT_SUCCESS, {
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-white shadow-sm flex justify-between items-center px-6 py-4">
        <div></div> {/* Empty left side for balance */}
        <h1 className="text-xl font-semibold text-gray-800">
          Hi, {userData.name} 👋
        </h1>
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
        <section className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🏗️ Create Room
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  placeholder="Enter room name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  placeholder="Enter description"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  rows={2}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="roomType" value="private" />
                    Private
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="roomType" value="public" />
                    Public
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg mt-4"
              >
                Create Room
              </button>
            </form>
          </div>
        </section>

        {/* Join Room Section */}
        <section className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🔑 Join Room
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room ID
                </label>
                <input
                  type="text"
                  placeholder="Enter room ID"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg mt-4"
              >
                Join Room
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
