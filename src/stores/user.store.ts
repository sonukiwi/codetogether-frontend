import { create } from "zustand";

interface User {
  email: string;
  name: string;
  picture: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: {
    email: "",
    name: "",
    picture: "",
  },
  setUser: (user: User) => set({ user }),
}));
