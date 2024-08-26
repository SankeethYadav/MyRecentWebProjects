import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb"
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth({
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: "/signin",
      signOut:'/signout'
    },
    callbacks: {
      async signIn({ user, account }) {
        // TODO: Block users to signin if they are not supposed to use the system
  
        return true;
      },
      async session({ session, token }) {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }
  
        if (session.user) {
          session.user.name = token.name;
          session.user.email = token.email;
        }

        return session;
      },
      async jwt({ token }) {
        if (!token.sub) return token;
  
        const existingUser = await getUserById(token.sub);
  
        if (!existingUser) return token;
  
        token.name = existingUser.name;
        token.email = existingUser.email;
  
        return token;
      }
    },
    session: { strategy: "jwt" },
    ...authConfig,
  });


