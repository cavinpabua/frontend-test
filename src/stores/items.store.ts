import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ItemType } from "@/types/item.type";

interface ItemStateType {
  items: ItemType[];
  setItems: (items: ItemType[]) => void;
}

const useItemStore = create<ItemStateType>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items: ItemType[]) => set({ items }),
    }),
    {
      name: "item-storage", // unique name
    }
  )
);

export default useItemStore;
