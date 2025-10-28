"use client";

import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import {
  API_LOGIN_URL,
  LOCAL_STORAGE_KEYS,
  TOAST_MESSAGES,
} from "../../../config";
import { useRouter, useSearchParams } from "next/navigation";
import MobileStepper from "@mui/material/MobileStepper";
import { useEffect, useState } from "react";
import { useUser } from "@/stores/user.store";
import { useAuth } from "@/stores/auth.store";

const LOADER_STEPS_COUNT = 6;

export default function Login() {
  const router = useRouter();
  const setUser = useUser((state) => state.setUser);
  const setToken = useAuth((state) => state.setToken);

  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    let interval: any = null;
    if (isLoginInProgress) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % LOADER_STEPS_COUNT);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isLoginInProgress]);

  useEffect(() => {
    const unauth = searchParams.get("unauthorized");
    if (unauth) {
      toast.error(TOAST_MESSAGES.INVALID_SESSION, {
        position: "top-center",
      });

      const newUrl = location.pathname;
      router.replace(newUrl);
    }
  }, [searchParams]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response.access_token;

      try {
        const res = await fetch(API_LOGIN_URL, {
          method: "POST",
          body: JSON.stringify({ access_token: accessToken }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resBody = await res.json();

        if (res.status === 200) {
          const { token, user_data: userData } = resBody;
          localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.USER_DATA,
            JSON.stringify(userData)
          );
          setToken(token);
          setUser(userData);

          router.push("/");
        } else {
          toast.error(resBody.message, {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error(error);
        toast.error(TOAST_MESSAGES.LOGIN_FAILED, {
          position: "top-center",
        });
      } finally {
        setIsLoginInProgress(false);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(TOAST_MESSAGES.LOGIN_FAILED, {
        position: "top-center",
      });
      setIsLoginInProgress(false);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        {/* Logo / App Name */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h1>
        <p className="text-gray-500 mb-8">
          Please log in with your Google account
        </p>

        {/* Google Login Button */}
        <button
          onClick={() => {
            setIsLoginInProgress(true);
            handleGoogleLogin();
          }}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition hover:cursor-pointer"
        >
          {isLoginInProgress ? (
            <MobileStepper
              steps={LOADER_STEPS_COUNT}
              backButton={<></>}
              nextButton={<></>}
              variant="dots"
              activeStep={activeStep}
              position="static"
            />
          ) : (
            <>
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-6 h-6"
              />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
