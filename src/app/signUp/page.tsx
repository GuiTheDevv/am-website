"use client";
import Card from "../components/atoms/card";
import Subtitle from "../components/atoms/subtitle";
import Title from "next/image";
import { emailCheck } from "./emailCheck";
import hashPassword from "../../../lib/passwordHasher";
import { passwordMatchCheck, passwordValidCheck } from "./passwordCheck";
import { SignUp } from "./SignUp";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target as HTMLFormElement;
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
      .value;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    try {
      const emailExist = await emailCheck(email);
      if (emailExist) {
        setEmailErrorMessage("Email Already Exists");
        setLoading(false);
        return;
      }
      const passwordValid = await passwordValidCheck(password);
      if (!passwordValid) {
        setPasswordErrorMessage(
          "Passwords Must Contain At Least 8 Characters, 1 Uppercase Letter, 1 Number, and 1 Symbol"
        );
        setLoading(false);
        return;
      }
      const passwordMatch = await passwordMatchCheck(password, confirmPassword);
      if (!passwordMatch) {
        setPasswordErrorMessage("Passwords Do Not Match");
        setLoading(false);
        return;
      }

      if (passwordValid && passwordMatch && !emailExist) {
        const hashedPassword = await hashPassword(password);
        if (hashedPassword) {
          const signedUp = await SignUp(
            firstName,
            lastName,
            email,
            hashedPassword
          );
          if (signedUp) {
            await signIn("credentials", {
              email: email,
              password: hashedPassword,
              redirect: false,
            });
            router.push("/");
          } else {
            form.reset();
            setErrorMessage("Sign Up Failed");
            setLoading(false);
            setTimeout(() => {
              setErrorMessage("");
            }, 4400);
          }
        }
        setLoading(false);
      }
    } catch (error) {
      form.reset();
      setErrorMessage("Sign Up Failed");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 4400);
      // send error email
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-zinc-950">
        <Card className="max-w-2xl mx-auto bg-black border border-gray-700">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Title
              alt="Your Company"
              src="/assets/images/logo.png"
              width={256}
              height={256}
              className="mx-auto h-20 w-auto  "
            />
            <Subtitle className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight ">
              Create an account
            </Subtitle>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 "
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 "
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onClick={() => setEmailErrorMessage("")}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>{emailErrorMessage && <p>{emailErrorMessage}</p>}</div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 "
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onClick={() => setPasswordErrorMessage("")}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 "
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onClick={() => setPasswordErrorMessage("")}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    autoComplete="confirm-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>{errorMessage && <p>{errorMessage}</p>}</div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-transparent hover:bg-white text-white outline outline-1 transition px-3 py-1.5 text-sm font-semibold leading-6 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold leading-6 text-gray-300 hover:text-white"
              >
                Login
              </a>
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
