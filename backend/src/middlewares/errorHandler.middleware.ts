import { ErrorRequestHandler } from "express"
import { INTERNAL_SERVER_ERROR } from "../constants/http";

const errorHandler:ErrorRequestHandler =(error,req,res, next )=>{
  console.log(`Error occured PATH: ${req.path}`, error);
  return res.status(INTERNAL_SERVER_ERROR).send(error)
}

export default errorHandler