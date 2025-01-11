import VerifyCationType from "../constants/verificationCodeType";
import User from "../models/user.model";
import VerifyCationCode from "../models/verificationCode.model";

type createUserData= {
  name: string;
  email: string;
  password: string;
  userAgent ?: string;
}

const createUser =async (data: createUserData) => {

  //check if user is already existing
  const existingUser = await User.exists({ email: data.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  //create a new user
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    userAgent: data.userAgent || undefined,
  });

  const userId = user._id

  const verificationCode = await VerifyCationCode.create({
    userId,
    code: "123213",
    type: VerifyCationType.VERIFY_EMAIL,
    expiresAt: oneYearFromNow
  })
  

}
export { createUser } 