"use server";

import supabase from "../../../public/db/supabase";

export async function SignUp(
  first: string,
  last: string,
  email: string,
  hashed_password: string
) {
  const { error } = await supabase.from("user").insert([
    {
      first: first,
      last: last,
      email: email,
      hashed_password: hashed_password,
    },
  ]);

  if (error) {
    //error handling
    console.log(error);
    return false;
  } else {
    return true;
  }
}
