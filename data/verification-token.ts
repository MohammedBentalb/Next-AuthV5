import { prisma } from "@/database/prisma";

/**
 * This function search for verification token using the token to find the unique precised one
 * @param token
 * @returns verificationToken
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

/**
 * This function search for verification token using the email to find the first email holding that token,
 * The verification token here is also unique since we made sure of that in the prisma schema
 * @param email
 * @returns verificationToken
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
