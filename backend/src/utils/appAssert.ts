import { HttpStatusCode } from "../constants/http";
import ApiError from "./ApiError";
import ApiErrorCode from "../constants/appErroCode";

/**
 * Assert a condition and throw an error if it is false.
 */

type AppAssert = (
  condition: unknown,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: ApiErrorCode
) => asserts condition;

const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode = ApiErrorCode.INTERNAL_SERVER_ERROR
) => {
  if (!condition) {
    throw new ApiError(httpStatusCode, message, appErrorCode);
  }
};

export default appAssert;
