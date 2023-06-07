import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserType } from "../types/survivor.type";

interface SurvivorState {
  user: UserType;
  setUser: (user: UserType) => void;
}

const useUserStore = create<SurvivorState>()(
  persist(
    (set) => ({
      user: {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        age: 0,
        infected: false,
        gender: "",
        role: "",
        password: "",
      },
      setUser: (user: UserType) => set({ user }),
    }),
    {
      name: "user-storage", // unique name
    }
  )
);

export default useUserStore;
