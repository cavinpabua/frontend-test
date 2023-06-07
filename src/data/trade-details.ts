import axios from "@/data/client";

export const addItemToTrade = async (
  requestId: number,
  userId: number,
  itemId: number
) => {
  const response = await axios.post(`/trade-details`, {
    requestId,
    userId,
    itemId,
  });
  return response.data;
};

export const removeItemFromTrade = async (id: number) => {
  const response = await axios.delete(`/trade-details/${id}`);
  return response.data;
};

export const getTradeDetails = async (id: number) => {
  const response = await axios.get(`/trade-details/${id}`);
  return response.data;
};
