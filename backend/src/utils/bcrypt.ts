import bcrypt from "bcrypt";

export const passwordHasher = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// export const passwordCompare = async (
//   password: string,
//   hashedPassword: string
// ): Promise<boolean> => {
//   return await bcrypt.compare(password, hashedPassword);
// };

export const passwordCompare = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};