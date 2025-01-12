import API from "@/config/axiousInstance";
import { LoginData } from "@/types/apiRequestTypes";


export const loginRequest  = async (data : LoginData) => {
  return API.post("/auth/login", data)
}