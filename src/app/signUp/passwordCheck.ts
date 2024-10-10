"use server";

export async function passwordMatchCheck(
  password: string,
  confirmPassword: string
) {
  // Define the password pattern: At least 8 characters, 1 uppercase letter, 1 number, and 1 symbol
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  // Check if passwords match and if the password follows the security rules
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
}

export async function passwordValidCheck(password: string) {
  // Define the password pattern: At least 8 characters, 1 uppercase letter, 1 number, and 1 symbol
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  // Check if passwords match and if the password follows the security rules
  if (passwordPattern.test(password)) {
    return true;
  } else {
    return false;
  }
}
