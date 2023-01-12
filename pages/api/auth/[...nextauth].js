import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.userId) {
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.userId) {
        session.user.userId = token.userId;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        try {
          if (
            user &&
            bcryptjs.compareSync(credentials.password, user.password)
          ) {
            const userInfo = {
              userId: user.userId,
              name: user.username,
              image: user.image,
            };
            return userInfo;
          }
          throw new Error("Invalid email or password");
        } catch (err) {
          const errorMessage = err.response.data.message;
          // Redirecting to the login page with error messsage in the URL
          throw new Error(errorMessage + "&email=" + credentials.email);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
