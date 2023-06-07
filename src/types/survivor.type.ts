export interface SurvivorsTableType {
  name: string;
  date: string;
  age: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  id: number;
  role: string;
  lastLocation: {
    latitude: number;
    longitude: number;
  };
  inventory: any[];
  inventoryString?: string;
  infected: boolean;
}

export interface SurvivorType {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  age: number;
  infected: boolean;
  gender: string;
  role: string;
}

export interface CreateSurvivorType {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  infected: boolean;
  gender: string;
  password: string;
  id: number;
  role: string;
}

export interface UserType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  infected: boolean;
  gender: string;
  password: string;
  role: string;
}

export interface HealthySurvivorsType {
  count: number;
  percentage: number;
}

export interface InfectedSurvivorsType {
  count: number;
  percentage: number;
}
