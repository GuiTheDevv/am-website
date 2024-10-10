"use server";
import bcrypt from "bcrypt";

async function hashPassword(password: string): Promise<string | null> {
  try {
    // bcrypt.hash returns a promise when no callback is provided
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    return null;
  }
}

export default hashPassword;
