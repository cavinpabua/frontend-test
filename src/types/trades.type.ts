import { SurvivorType } from "./survivor.type";

export interface TradesTableType {
  id: number;
  status: string;
  createAt: string;
  userAccept1?: string;
  userAccept2?: string;
  userId1?: number;
  userId2?: number;
  user1: SurvivorType;
  user2: SurvivorType;
  name?: string;
}
