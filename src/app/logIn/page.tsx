"use client";
import { signIn } from "next-auth/react";
import Card from "../components/atoms/card";
import Subtitle from "../components/atoms/subtitle";
import Title from "next/image";
import hashPassword from "../../../lib/passwordHasher";

export default function LoginPage() {
  // const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const email = (form.elements.namedItem("email") as HTMLInputElement)
        .value;
      const password = (form.elements.namedItem("password") as HTMLInputElement)
        .value;

      const hashedPassword = await hashPassword(password);

      if (hashedPassword) {
        signIn("credentials", {
          email: email,
          password: hashedPassword,
          redirect: false,
        });
      }
    } catch (error) {
      //send error email
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
              Login into your account
            </Subtitle>
          </div>

          {/* google sign in button */}

          {/* <div>
            <button onClick={() => signIn("google")}>
              Sign in with Google
            </button>
          </div> */}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 "
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className=" text-gray-300 hover:text-white underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-transparent hover:bg-white text-white outline outline-1 transition px-3 py-1.5 text-sm font-semibold leading-6 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="/signUp"
                className="font-semibold leading-6 text-gray-300 hover:text-white"
              >
                Sign Up
              </a>
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
