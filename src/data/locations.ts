import axios from "@/data/client";

export const addNewLocation = async (
  userId: number,
  latitude: string,
  longitude: string
) => {
  const response = await axios.post("/locations", {
    userId,
    latitude,
    longitude,
  });
  return response.data;
};

export const locationOfAllSurvivors = async () => {
  const response = await axios.get("/locations");
  return response.data;
};

export const getLocationHistory = async (id: number) => {
  const response = await axios.get(`/locations/history/${id}`);
  return response.data;
};

export const getLocation = async (id: number) => {
  const response = await axios.get(`/locations/${id}`);
  return response.data;
};
