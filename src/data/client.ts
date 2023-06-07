import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_NETWORK_SERVER
  ? `https://${process.env.NEXT_PUBLIC_NETWORK_SERVER}/`
  : `http://localhost:${process.env.NEXT_PUBLIC_LOCAL_PORT || 3000}/`;

const client = axios.create({
  baseURL,
});

client.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (token) {
        try {
          config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          console.error(error);
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
