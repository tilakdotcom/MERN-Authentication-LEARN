import axios, { AxiosInstance } from "axios";
import queryClient from "./queryClient";

const URI = import.meta.env.VITE_BACKEND_URI;

if (!URI) {
  throw new Error("Missing VITE_BACKEND_URI environment variable");
}

const API: AxiosInstance = axios.create({
  baseURL: URI,
  withCredentials: true,
});

const refreshToken: AxiosInstance = axios.create({
  baseURL: URI,
  withCredentials: true,
});

refreshToken.interceptors.response.use((response) => response.data);

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { response, config } = error;
    const { status, data } = response;
    console.log("error response", response)
    console.log("error data", data)
    console.log("error status", error)

    if (data.status === 401 && data.errorCode === "INVALID_ACCCESS_TOKEN") {
      try {
        await refreshToken.get("/auth/refresh");
        return refreshToken(config);
      } catch (error) {
        window.location.href = "/login";
        queryClient.clear();
        throw new Error(`Session expired ${error}`);
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;
