"use client";
import { SessionProvider } from "next-auth/react";

const NextauthWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextauthWrapper;
