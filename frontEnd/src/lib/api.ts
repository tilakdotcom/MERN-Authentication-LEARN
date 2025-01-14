import API from "@/config/axiousInstance";
import {
  LoginData,
  ResetPasswordData,
  SignupData,
} from "@/types/apiRequestTypes";
import { TSession } from "@/types/session";

export const loginRequest = async (data: LoginData) => {
  return API.post("/auth/login", data);
};

export const signupRequest = async (data: SignupData) => {
  return API.post("/auth/register", data);
};

export const verifyEmailRequest = async (code: string) => {
  return API.get(`/auth/verify-email/${code}`);
};

export const forgotPasswordRequest = async (email: string) => {
  return API.post("/auth/forgot-password", { email });
};

export const resetPasswordRequest = async (data: ResetPasswordData) => {
  return API.patch("/auth/reset-password", data);
};


export const logoutRequest =()=>{
  return API.post("/auth/logout")
}

export const userRequest = ()=>{
  return API.get("/user")
}


export const sessionRequest = async () =>{
  return API.get<TSession>("/session")
}

export const deleteSessionRequest = async (id: string)=>{
  return API.delete(`/session/${id}`)
}