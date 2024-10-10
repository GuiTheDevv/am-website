"use server";
import supabase from "../../../public/db/supabase";

export async function emailCheck(email: string) {
  const { data } = await supabase
    .from("user")
    .select("email")
    .eq("email", email)
    .single();

  if (data) {
    return true;
  } else {
    return false;
  }
}
