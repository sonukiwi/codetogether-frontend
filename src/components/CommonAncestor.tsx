"use client";

import { useUser } from "@/stores/user.store";
import { useEffect } from "react";
import {
  APP_ROUTES,
  LOCAL_STORAGE_KEYS,
  PROTECTED_APP_ROUTES,
  TOAST_MESSAGES,
} from "../../config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CommonAncestor({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUserData = useUser((state) => state.setUserData);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (PROTECTED_APP_ROUTES.includes(pathname)) {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
      if (!token) {
        router.push(APP_ROUTES.LOGIN);
        toast.error(TOAST_MESSAGES.LOGIN_REQUIRED, {
          position: "top-center",
        });
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
