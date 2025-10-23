import { create } from "zustand";

interface AuthStore {
  token: string;
  setToken: (token: string) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
}));
