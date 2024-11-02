"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignIn() {
  const credentialsAction = async  (formData: FormData) => {
    console.log("formData", formData);
    const formDataObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    let p = await signIn("credentials", formDataObj);
    console.log("p", p);
  };
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      window.location.href = "/logged/home";
    }
  }, [session]);
  return (
    <>
      <form action={credentialsAction}>
        <label htmlFor="credentials-email">
          Email
          <input type="email" id="credentials-email" name="email" />
        </label>
        <label htmlFor="credentials-password">
          Password
          <input type="password" id="credentials-password" name="password" />
        </label>
        <input type="submit" value="Sign In" />
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
      >
        Google Sign In
      </button>
      <a href="/register">Register</a>
    </>
  );
}
