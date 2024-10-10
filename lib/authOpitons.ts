import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import supabase from "../public/db/supabase";
import { User } from "../public/interfaces/user";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
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
          throw new Error("Incorrect username or password");
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
            throw new Error("Incorrect username or password");
          }
        }
        return null;
      },
    }),
  ],
};

export default authOptions;
