"use client";

import { useUser } from "@/stores/user.store";
import { useEffect, useState } from "react";
import {
  API_TO_CHECK_TOKEN_VALIDITY,
  APP_ROUTES,
  LOCAL_STORAGE_KEYS,
  PROTECTED_APP_ROUTES,
  TOAST_MESSAGES,
} from "../../config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/stores/auth.store";
import api from "@/utils/api";
import CircularProgress from "@mui/material/CircularProgress";

export default function CommonAncestor({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTokenValidationInProgress, setIsTokenValidationInProgress] =
    useState(true);

  const setUser = useUser((state) => state.setUser);
  const setToken = useAuth((state) => state.setToken);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (token) {
      setToken(token);
    }

    const userData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    async function validate_token() {
      try {
        setIsTokenValidationInProgress(true);

        let isTokenValid = false;
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

        if (!token) {
          isTokenValid = false;
        } else {
          const res = await api.get(API_TO_CHECK_TOKEN_VALIDITY);

          if (res.status === 200) {
            const { is_valid: isValid } = res.data;
            isTokenValid = isValid as boolean;
          } else {
            console.error("Error while validating token");
            isTokenValid = true;
          }
        }

        if (!isTokenValid) {
          router.push(APP_ROUTES.LOGIN);
          toast.error(TOAST_MESSAGES.INVALID_SESSION, {
            position: "top-center",
          });
          localStorage.clear();
        }
      } catch (error) {
        console.error("Error while validating token");
        console.error(error);
      } finally {
        setIsTokenValidationInProgress(false);
      }
    }

    if (PROTECTED_APP_ROUTES.includes(pathname)) {
      validate_token();
    } else {
      setIsTokenValidationInProgress(false);
    }
  }, [pathname]);

  const loadingComponent = (
    <div className="flex items-center justify-center min-h-screen">
      <CircularProgress />
    </div>
  );

  return <>{isTokenValidationInProgress ? loadingComponent : children}</>;
}
