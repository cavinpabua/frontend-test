import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TradesTableType } from "@/types/trades.type";

interface TradeStateType {
  trades: TradesTableType[];
  setTrades: (trades: TradesTableType[]) => void;
}

const useTradesStore = create<TradeStateType>()(
  persist(
    (set) => ({
      trades: [],
      setTrades: (trades: TradesTableType[]) => set({ trades }),
    }),
    {
      name: "trades-storage", // unique name
    }
  )
);

export default useTradesStore;
