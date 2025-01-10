import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import { CREATED } from "../constants/http";





const registerHandler =asyncHandler( async (req:Request, res:Response)=>{
  // Handle registration logic here
  // Return response with success message or error
  res.status(CREATED).json(
    
    { message: "User registered successfully!" }
  )
})


export {
  registerHandler,
}