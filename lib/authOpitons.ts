import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import supabase from "../public/db/supabase";
import { User } from "../public/interfaces/user";
import bcrypt from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        let { data, error } = await supabase
          .from("user")
          .select("*")
          .eq("email", credentials?.email)
          .single();

        if (error) {
          //error handling
          return null;
        }

        if (data) {
          const passwordCorrect = await bcrypt.compare(
            credentials?.password as string,
            data.hashed_password
          );

          if (passwordCorrect) {
            return {
              id: data.id,
              first: data.first,
              last: data.last,
              email: data.email,
              role: data.role,
            };
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
