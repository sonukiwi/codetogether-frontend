import { create } from "zustand";

interface User {
  email: string;
  name: string;
  picture: string;
}

interface UserStore {
  user: User;
  setUserData: (user: User) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: {
    email: "",
    name: "",
    picture: "",
  },
  setUserData: (user: User) => set({ user }),
}));
