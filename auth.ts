import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Utilisateur", placeholder: "forest1" },
    password: { label: "password", type: "password" },
  },
  /*   credentials: {
    email: {
      label: "Utilisateur",
    },
    password: {
      label: "Mot de passe",
      type: "password",
    },
  }, */
  async authorize(credentials) {
    // on va checker si les credentials sont corrects ou pas
    //Call backend login service

    //console.log("CREDENTIALS: ", credentials);

    const { username, password } = credentials;

    if (!username || !password) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        username: username as string,
      },
      include: { country: true },
    });

    if (!user || !user.password) {
      return null;
    }

    const checkPass = await bcrypt.compare(password as string, user.password);

    //console.log("checkPass user:=", checkPass, user);

    if (checkPass) {
      // console.log("CON OK");

      const redata = {
        id: user.id + "",
        role: user.role,
        email: user.email,
        status: user.status,
        username: user.username,
        name: user.username,
        countryId: user.country?.id,
        continent: user.country?.continent,
        createAt: user.createdAt,
        updatedAt: user.updatedAt,
        // usermaj: user.username,

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      };

      //console.log("REDATA", redata);

      return redata;
    }

    return null;
  },
});

const config = {
  providers: [credentialsConfig],
  callbacks: {
    authorized({ request, auth }) {
      // console.log("URL+++", request.nextUrl);
      console.log("AUTHH+++", auth);

      const { pathname } = request.nextUrl;
      if (pathname === "/dashboard" || pathname === "/coucou/users")
        return !!auth;
      const usr: any = auth?.user;
      const seg = usr?.continent + "/" + usr?.countryId;
      //console.log("seg", seg);

      if (usr?.role == "AGENT") {
        if (pathname.includes("continents") && !pathname.includes(seg)) {
          //const tempo = usr.
          //console.log("contv", usr.continent);
          //console.log("PATHNAMEv", pathname);
          const test = pathname.split(usr.continent + "/")[1];
          //console.log("testv", test);
          //NextResponse.rewrite(`/continents/${seg}`);
          return NextResponse.redirect(new URL("/redirect", request.url));
          // return true;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  trustHost: true,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
