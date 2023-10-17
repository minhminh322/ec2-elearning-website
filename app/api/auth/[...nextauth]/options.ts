import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvier from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvier({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials?.password,
          user.password || ""
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",

  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, session }) {
      // console.log("jwt", { token, user, session });
      // if (account?.accessToken) {
      //   token.accessToken = account.accessToken;
      // }
      // if (profile?.id) {
      //   token.id = profile.id;
      // }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          // email: user.email,
          // name: user.name,
          // image: user.image,
        },
      };
    },
  },
};
