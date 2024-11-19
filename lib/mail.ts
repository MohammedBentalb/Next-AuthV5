import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * This function is used to send email for verification using RESEND
 * but since I haven't provided a domain yet,
 * email will only reach me until I provide the full domain ULR. 
 * I'll add it in deployment
 * @param email
 * @param token
 */

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">HERE</a> to confirm email.</p>`,
  });
};
