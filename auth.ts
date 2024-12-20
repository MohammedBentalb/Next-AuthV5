import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./database/prisma";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { Role } from "@prisma/client";

// extending the session user to also hold the user.role type
declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      if (!user || !user.id) return;
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      /**
       * example of controlling the email provided
       * if (user.email && !user.email.includes("@gmail.com")) return false;
       */
      // Allowing users to sign in when using Google / Github providers since they are trusted and verified (refer ro "linkAccount" above)
      if (account?.provider !== "credentials") return true;
      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;
      return true;
    },
    async session({ session, token }) {
      if (token.role && session.user) session.user.role = token.role as Role;
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
