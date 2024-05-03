import db from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

const authConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/authentication/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.sub = user.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.sub = token.sub;
      }
      return session;
    },
  },
};

export default authConfig;
