import { ErrorRequestHandler } from "express"

const errorHandler:ErrorRequestHandler =(error,req,res, next )=>{
  console.log(`Error occured PATH: ${req.path}`, error);
  return res.status(500).send(error)
}

export default errorHandler