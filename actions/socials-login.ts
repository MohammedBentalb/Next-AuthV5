"use server";

import { signIn } from "@/auth";

export const providersLogin = async (
  provider: "google" | "github",
  callbackURL: string
) => {
  await signIn(provider, { redirectTo: callbackURL });
};
