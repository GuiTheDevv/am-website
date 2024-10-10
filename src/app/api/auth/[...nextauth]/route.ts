import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import authOpitons from "../../../../../lib/authOpitons";
const handler = NextAuth(authOpitons);
export { handler as GET, handler as POST };
