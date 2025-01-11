import assert  from "node:assert"
import { HttpStatusCode } from "../constants/http"
import ApiErrorCode from "../constants/appErroCode"
import ApiError from "./ApiError"


/**
 * Assert a condition and throw an error if it occur
 * and false
 */

type AppAssert =(
  condition:any,
  httpStatusCode: HttpStatusCode,
  message :string,
  appErrorCode? :ApiErrorCode
)=> asserts condition

const appAssert:AppAssert = (condition,httpStatusCode,message,appErrorCode) =>assert(condition, new ApiError(httpStatusCode,message,appErrorCode))


export default appAssert