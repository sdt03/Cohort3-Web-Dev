import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prismdb";
import { SignJWT, JWTPayload } from "jose";
import { randomUUID } from "crypto";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export interface CustomSession extends Session {
  user: {
    id: string;
    jwtToken: string;
    email: string;
    name: string;
  };
}

interface Token extends JWT {
  uid: string;
  jwtToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not defined");
  }

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("365d")
    .setIssuedAt()
    .setJti(randomUUID())
    .sign(new TextEncoder().encode(secret));

  console.log("Generated JWT:", jwt);
  return jwt;
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.username || !credentials?.password) {
          console.error("Error: Missing username or password");
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        });

        if (!user) {
          console.error("Error: User not found");
          throw new Error("Invalid credentials");
        }

        console.log("Fetched User:", user);

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        console.log("Password Match Result:", passwordMatch);

        if (!passwordMatch) {
          console.error("Error: Password does not match");
          throw new Error("Invalid credentials");
        }

        const jwt = await generateJWT({ id: user.id });

        console.log("JWT Generated Successfully");

        await prisma.user.update({
          where: { id: user.id },
          data: { token: jwt },
        });

        console.log("User Token Updated in Database");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          token: jwt,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("Session Callback Triggered:", { session, token });
      const newSession = session as CustomSession;
      if (newSession.user && token.uid) {
        newSession.user.id = token.uid as string;
        newSession.user.jwtToken = token.jwtToken as string;
      }
      return newSession;
    },
    async jwt({ token, user }) {
      console.log("JWT Callback Triggered:", { token, user });
      const newToken: Token = token as Token;

      if (user) {
        newToken.uid = user.id;
        newToken.jwtToken = (user as User).token;
      }
      return newToken;
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
