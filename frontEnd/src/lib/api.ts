import API from "@/config/axiousInstance";
import { LoginData, SignupData } from "@/types/apiRequestTypes";


export const loginRequest  = async (data : LoginData) => {
  return API.post("/auth/login", data)
}

export const signupRequest = async (data : SignupData) => {
  return API.post("/auth/register", data)
}