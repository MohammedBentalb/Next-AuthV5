import { getVerificationTokenByEmail } from "@/data/verification-token";
import { prisma } from "@/database/prisma";
import { v4 as uuidV4 } from "uuid";

/**
 * This function generates a token and send it to database then returning a verification token object
 * @param email
 * @returns verificationToken
 */

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: { email, token, expires },
  });
  return verificationToken;
};
