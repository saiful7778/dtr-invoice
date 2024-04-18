import CredentialProvider from "next-auth/providers/credentials";
import authConfig from "@/lib/config/auth.config";
import { loginSchema } from "@/lib/schemas/authentication";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import db from "@/lib/db";

const auth = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETS,
    }),
    CredentialProvider({
      async authorize(credentials) {
        const isValid = await loginSchema.isValid(credentials);

        if (!isValid) return null;

        try {
          const user = await db.user.findFirst({
            where: { email: credentials.email },
          });

          if (!user) return null;

          if (user?.hashedPassword) {
            const isCorrect = await compare(
              credentials.password,
              user.hashedPassword,
            );
            if (!isCorrect) return null;
          }

          return {
            name: user.name,
            email: user.email,
            role: user.role,
            image: user?.image?.url,
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  ...authConfig,
};

export default auth;
