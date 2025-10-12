import { create } from "zustand";

interface User {
  email: string;
  name: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));

export default useUserStore;
