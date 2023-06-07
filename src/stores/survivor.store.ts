import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SurvivorsTableType } from "../types/survivor.type";

interface SurvivorState {
  survivors: SurvivorsTableType[];
  isReady: boolean;
  showCreateModal: boolean;
  setShowCreateModal: (showCreateModal: boolean) => void;
  setSurvivors: (survivors: any) => void;
  addSurvivor: (survivor: any) => void;
  setIsReady: (loading: boolean) => void;
}

const useSurvivorStore = create<SurvivorState>()(
  persist(
    (set) => ({
      survivors: [],
      isReady: true,
      showCreateModal: false,
      setShowCreateModal: (showCreateModal: boolean) =>
        set({ showCreateModal }),
      setSurvivors: (survivors: any) => set({ survivors }),
      // add 1 survivor
      addSurvivor: (survivor: any) =>
        set((state) => ({ survivors: [...state.survivors, survivor] })),
      setIsReady: (isReady: boolean) => set({ isReady }),
    }),
    {
      name: "survivors-storage", // unique name
    }
  )
);

export default useSurvivorStore;
