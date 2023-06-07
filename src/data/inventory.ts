import axios from "@/data/client";

export const getInventory = async (id: number) => {
  const response = await axios.get(`/inventory/${id}`);
  return response.data;
};

export const averageResourceAllocation = async (id: number) => {
  const response = await axios.get(`/inventory/average/${id}`);
  return response.data;
};
