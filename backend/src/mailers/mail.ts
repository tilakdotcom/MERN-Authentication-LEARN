import { INTERNAL_SERVER_ERROR } from "../constants/http";
import ApiError from "../utils/ApiError";
import { mailSender, mailTransport } from "./config";
import { verify_email_tamplate, verify_password_reset_template } from "./template";


export const sendVerificationEmail = (
  email: string,
  url: string
) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Verify Your Account!",
        html:verify_email_tamplate(url,email),
        category: "Email Verification",
      })
      .then(console.log)
      .catch(console.error);
  } catch (error: any) {
    console.error(
      `Error sending verification email to ${email}: ${error.message}`
    );
    throw new ApiError(INTERNAL_SERVER_ERROR, "Failed to send verification email");
  }
};
export const sendResetPassword = (
  email: string,
  url: string
) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Reset Your Password",
        html:verify_password_reset_template(url,email),
        category: "Reset Password",
      })
      .then(console.log)
      .catch(console.error);
  } catch (error: any) {
    console.error(
      `Error sending verification email to ${email}: ${error.message}`
    );
    throw new ApiError(INTERNAL_SERVER_ERROR, "Failed to send verification email");
  }
};
