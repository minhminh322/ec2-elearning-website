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
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (user && user.password === credentials?.password) {
          return user;
        } else {
          return null;
        }
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
