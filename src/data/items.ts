import axios from "@/data/client";

export const createItem = async (name: string, description: string) => {
  const response = await axios.post("/items", {
    name,
    description,
  });
  return response.data;
};

export const getAllItems = async () => {
  const response = await axios.get("/items");
  return response.data;
};

export const getItem = async (id: number) => {
  const response = await axios.get(`/items/${id}`);
  return response.data;
};

export const updateItem = async (
  id: number,
  name: string,
  description: string
) => {
  const response = await axios.patch(`/items/${id}`, {
    name,
    description,
  });
  return response.data;
};

export const deleteItem = async (id: number) => {
  const response = await axios.delete(`/items/${id}`);
  return response.data;
};
