import axios from "@/data/client";

export const createNewTrade = async (userId1: number, userId2: number) => {
  const response = await axios.post(`/trade-requests`, {
    userId1,
    userId2,
  });
  return response.data;
};

export const acceptTrade = async (id: number) => {
  const response = await axios.post(`/trade-requests/accept`, {
    id,
  });
  return response.data;
};

export const rejectTrade = async (id: number) => {
  const response = await axios.post(`/trade-requests/reject`, {
    id,
  });
  return response.data;
};

export const getTrade = async (id: number) => {
  const response = await axios.get(`/trade-requests/${id}`);
  return response.data;
};

export const getTrades = async () => {
  const response = await axios.get(`/trade-requests`);
  return response.data;
};

export const getTradeHistory = async () => {
  const response = await axios.get(`/trade-requests/history`);
  return response.data;
};
