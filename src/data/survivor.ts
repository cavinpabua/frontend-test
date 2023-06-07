import axios from "@/data/client";

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  age: number,
  infected: boolean,
  gender: string
) => {
  const response = await axios.post("/survivors", {
    email,
    firstName,
    lastName,
    age,
    infected,
    gender,
    password,
  });
  return response.data;
};

export const getAllSurvivors = async () => {
  const response = await axios.get("/survivors");
  return response.data;
};

export const getSurvivor = async (id: number) => {
  const response = await axios.get(`/survivors/${id}`);
  return response.data;
};

export const getOwnData = async () => {
  const response = await axios.get(`/survivors/own`);
  return response.data;
};

export const updateSurvivorDetails = async (
  email?: string,
  firstName?: string,
  lastName?: string,
  age?: number,
  infected?: boolean,
  gender?: string
) => {
  const response = await axios.patch("/survivors", {
    email,
    firstName,
    lastName,
    age,
    infected,
    gender,
  });
  return response.data;
};

// Number of Healthy Survivors
export const getHealthySurvivors = async () => {
  const response = await axios.get("/survivors/healthy");
  return response.data;
};

// Number of Infected Survivors
export const getInfectedSurvivors = async () => {
  const response = await axios.get("/survivors/infected");
  return response.data;
};
