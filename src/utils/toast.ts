import toast, { ToastPosition } from "react-hot-toast";

const TOAST_CONFIG = {
  position: "top-center" as ToastPosition,
  style: {
    background: "#363636",
    color: "#fff",
  },
};

export function show_toast(message: string, type: "success" | "error") {
  if (type === "success") {
    toast.success(message, TOAST_CONFIG);
  } else {
    toast.error(message, TOAST_CONFIG);
  }
}
